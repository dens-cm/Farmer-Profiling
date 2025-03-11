import { useState } from 'react'
import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { firestoreDB, storage } from '../config/FirebaseConfig'
import Toast from '../components/layouts/Toast'

export const useDeleteFarmer = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const showToast = Toast()

    const deleteFarmer = async (farmerId) => {
        if (!farmerId) return
        setLoading(true)
        setError(null)

        try {
            const subCollections = ["personal_information", "children", "education", "crops", "livestock"]
            for (const sub of subCollections) {
                const subCollectionRef = collection(firestoreDB, `farmers/${farmerId}/${sub}`)
                const subDocs = await getDocs(subCollectionRef)
                const deleteSubPromises = subDocs.docs.map((subDoc) => deleteDoc(subDoc.ref))
                await Promise.all(deleteSubPromises)
            }

            await deleteDoc(doc(firestoreDB, "farmers", farmerId))

            try {
                const imageRef = ref(storage, `farmers/${farmerId}/farmerImage`)
                await deleteObject(imageRef)
            } catch {
                showToast({ title: 'Info', description: `Farmer image not found or already deleted`, status: 'info', variant: 'solid', position: 'top' })
            }

            showToast({ title: 'Success', description: "Farmer deleted successfully!", status: 'success', variant: 'solid', position: 'top' })
        } catch (err) {
            setError(err.message)
            showToast({ title: 'Error', description: `Error deleting farmer: ${err}`, status: 'error', variant: 'solid', position: 'top' })
        } finally {
            setLoading(false)
        }
    }

    return { deleteFarmer, loading, error }
}
