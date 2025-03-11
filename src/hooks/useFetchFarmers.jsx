import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        let unsubscribes = []

        const fetchFarmers = async () => {
            const unsubscribeFarmers = onSnapshot(
                collection(firestoreDB, 'farmers'),
                (farmerSnapshot) => {
                    const farmersArray = []
                    let male = 0
                    let female = 0

                    farmerSnapshot.forEach((farmerDoc) => {
                        const farmerId = farmerDoc.id
                        const personalInformationRef = collection(firestoreDB, `farmers/${farmerId}/personal_information`)

                        const unsubscribePersonalInfo = onSnapshot(
                            personalInformationRef,
                            (personalInfoSnapshot) => {
                                personalInfoSnapshot.forEach((personalInfoDoc) => {
                                    const farmerData = {
                                        id: farmerId,
                                        ...personalInfoDoc.data()
                                    }
                                    farmersArray.push(farmerData)

                                    // Count gender occurrences
                                    if (farmerData.gender === 'Male') male++
                                    if (farmerData.gender === 'Female') female++
                                })

                                setData([...farmersArray])
                                setTotal(farmersArray.length)
                                setMaleCount(male)
                                setFemaleCount(female)
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

    return { data, total, maleCount, femaleCount, error }
}
