import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmerPersonalInformation = (farmerId) => {
    const [personalInformation, setPersonalInformation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!farmerId) return

        const personalInformationRef = collection(firestoreDB, `farmers/${farmerId}/personal_information`)
        setLoading(true)

        const unsubscribe = onSnapshot(
            personalInformationRef,
            (snapshot) => {
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0]
                    setPersonalInformation({ id: doc.id, ...doc.data() })
                } else {
                    setPersonalInformation(null)
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

    return { personalInformation, loading, error }
}
