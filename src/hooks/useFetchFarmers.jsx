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
    const [cropFarmerCounts, setCropFarmerCounts] = useState([])
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
                    const cropFarmers = {}

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
                                const farmerCrops = new Set()

                                cropsSnapshot.forEach((cropDoc) => {
                                    const cropName = (cropDoc.data().crop || 'Unknown').toLowerCase()

                                    // Count total crops
                                    cropCounts[cropName] = (cropCounts[cropName] || 0) + 1

                                    // Track farmers planting this crop
                                    farmerCrops.add(cropName)
                                })

                                // Update the cropFarmers count
                                farmerCrops.forEach((crop) => {
                                    cropFarmers[crop] = (cropFarmers[crop] || 0) + 1
                                })

                                // Update states
                                const totalCropsCount = Object.values(cropCounts).reduce((sum, count) => sum + count, 0)
                                setTotalCrops(totalCropsCount)

                                // Sort crops by count
                                const sortedCrops = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])

                                // Extract top 5 crops
                                const top5 = sortedCrops.slice(0, 5).map(([crop, count]) => ({ x: crop, y: count }))

                                // Sum the rest as "Others"
                                const othersCount = sortedCrops.slice(5).reduce((sum, [, count]) => sum + count, 0)
                                if (othersCount > 0) {
                                    top5.push({ x: "Others", y: othersCount })
                                }

                                setTopCrops(top5)

                                // Convert cropFarmers to array format for table
                                const cropFarmerArray = Object.entries(cropFarmers).map(([crop, count]) => ({
                                    crop: crop,
                                    totalFarmer: count
                                }))

                                setCropFarmerCounts(cropFarmerArray)
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

    return { data, total, maleCount, femaleCount, civilStatusCounts, sourceOfIncomeCounts, cropFarmerCounts, topCrops, totalCrops, error }
}
