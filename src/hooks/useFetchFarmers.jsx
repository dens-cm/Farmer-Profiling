import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmers = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        let unsubscribes = []

        const unsubscribeFarmers = onSnapshot(collection(firestoreDB, 'farmers'), (farmerSnapshot) => {
            const farmersArray = []

            farmerSnapshot.forEach((farmerDoc) => {
                const farmerId = farmerDoc.id
                const personalInformationRef = collection(firestoreDB, `farmers/${farmerId}/personal_information`)

                const unsubscribePersonalInfo = onSnapshot(personalInformationRef, (personalInfoSnapshot) => {
                    personalInfoSnapshot.forEach((personalInfoDoc) => {
                        farmersArray.push({
                            id: farmerId,
                            ...personalInfoDoc.data()
                        })
                    })

                    setData([...farmersArray]) 
                })

                unsubscribes.push(unsubscribePersonalInfo)
            })
        })

        unsubscribes.push(unsubscribeFarmers)

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe())
        }
    }, [])

    return { data }
}
