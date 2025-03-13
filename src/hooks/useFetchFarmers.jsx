import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDB } from '../config/FirebaseConfig'

export const useFetchFarmers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)
    const [civilStatusCounts, setCivilStatusCounts] = useState({})
    const [sourceOfIncomeCounts, setSourceOfIncome] = useState({})
    const [topCrops, setTopCrops] = useState([])
    const [totalCrops, setTotalCrops] = useState(0)
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
                    const statusCounts = {}
                    const incomeCounts = {}
                    const cropCounts = {}

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

                                    // Count civil status occurrences
                                    const status = farmerData.civilStatus || 'Unknown'
                                    statusCounts[status] = (statusCounts[status] || 0) + 1

                                    // Count source of income occurrences
                                    const income = farmerData.sourceOfIncome || 'Unknown'
                                    incomeCounts[income] = (incomeCounts[income] || 0) + 1
                                })

                                setData([...farmersArray])
                                setTotal(farmersArray.length)
                                setMaleCount(male)
                                setFemaleCount(female)
                                setCivilStatusCounts(statusCounts)
                                setSourceOfIncome(incomeCounts)
                            },
                            (personalInfoError) => {
                                setError(personalInfoError.message)
                            }
                        )
                        unsubscribes.push(unsubscribePersonalInfo)

                        // Fetch crops
                        const cropsRef = collection(firestoreDB, `farmers/${farmerId}/crops`)
                        const unsubscribeCrops = onSnapshot(
                            cropsRef,
                            (cropsSnapshot) => {
                                cropsSnapshot.forEach((cropDoc) => {
                                    // Normalize crop name to lowercase
                                    const cropName = (cropDoc.data().crop || 'Unknown').toLowerCase()
                                    cropCounts[cropName] = (cropCounts[cropName] || 0) + 1
                                })

                                const totalCropsCount = Object.values(cropCounts).reduce((sum, count) => sum + count, 0)
                                setTotalCrops(totalCropsCount)

                                // Get top 5 crops
                                const sortedCrops = Object.entries(cropCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5)
                                    .map(([crop, count]) => ({ x: crop, y: count }))

                                setTopCrops(sortedCrops)
                            },
                            (cropsError) => {
                                setError(cropsError.message)
                            }
                        )
                        unsubscribes.push(unsubscribeCrops)
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

    return { data, total, maleCount, femaleCount, civilStatusCounts, sourceOfIncomeCounts, topCrops, totalCrops, error }
}
