import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmerEducation = (farmerId) => {
    const [education, setEducation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!farmerId) return

        const educationRef = collection(firestoreDB, `farmers/${farmerId}/education`)
        setLoading(true)

        const unsubscribe = onSnapshot(
            educationRef,
            (snapshot) => {
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0]
                    setEducation({ id: doc.id, ...doc.data() })
                } else {
                    setEducation(null)
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

    return { education, loading, error }
}
