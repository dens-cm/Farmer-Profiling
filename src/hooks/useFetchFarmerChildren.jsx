import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmerChildren = (farmerId) => {
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!farmerId) return

        const childrenRef = collection(firestoreDB, `farmers/${farmerId}/childrens`)
        setLoading(true)

        const unsubscribe = onSnapshot(
            childrenRef,
            (snapshot) => {
                if (!snapshot.empty) {
                    const childrenArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setChildren(childrenArray)
                } else {
                    setChildren([])
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

    return { children, loading, error }
}
