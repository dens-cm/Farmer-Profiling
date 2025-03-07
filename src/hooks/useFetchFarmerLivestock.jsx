import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmerLivestock = (farmerId) => {
    const [livestock, setLivestock] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!farmerId) return

        const livestockRef = collection(firestoreDB, `farmers/${farmerId}/livestock`)
        setLoading(true)

        const unsubscribe = onSnapshot(
            livestockRef,
            (snapshot) => {
                if (!snapshot.empty) {
                    const livestockArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setLivestock(livestockArray)
                } else {
                    setLivestock([])
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

    return { livestock, loading, error }
}
