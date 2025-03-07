import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        let unsubscribes = []

        const fetchFarmers = async () => {
            const unsubscribeFarmers = onSnapshot(
                collection(firestoreDB, 'farmers'),
                (farmerSnapshot) => {
                    const farmersArray = []

                    farmerSnapshot.forEach((farmerDoc) => {
                        const farmerId = farmerDoc.id
                        const personalInformationRef = collection(firestoreDB, `farmers/${farmerId}/personal_information`)

                        const unsubscribePersonalInfo = onSnapshot(
                            personalInformationRef,
                            (personalInfoSnapshot) => {
                                personalInfoSnapshot.forEach((personalInfoDoc) => {
                                    farmersArray.push({
                                        id: farmerId,
                                        ...personalInfoDoc.data()
                                    })
                                })

                                setData([...farmersArray])
                                setTotal(farmersArray.length)
                            },
                            (personalInfoError) => {
                                setError(personalInfoError.message)
                            }
                        )
                        unsubscribes.push(unsubscribePersonalInfo)
                    })
                },
                (farmerError) => {
                    setError(farmerError.message)
                }
            )

            unsubscribes.push(unsubscribeFarmers)
        }

        fetchFarmers()
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe())
        }
    }, [])

    return { data, total, error }
}
