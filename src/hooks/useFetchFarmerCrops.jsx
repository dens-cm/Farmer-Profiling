import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmerCrop = (farmerId) => {
    const [crop, setCrop] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!farmerId) return

        const cropRef = collection(firestoreDB, `farmers/${farmerId}/crops`)
        setLoading(true)

        const unsubscribe = onSnapshot(
            cropRef,
            (snapshot) => {
                if (!snapshot.empty) {
                    const cropArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setCrop(cropArray)
                } else {
                    setCrop([])
                }
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [farmerId])

    return { crop, loading, error }
}
