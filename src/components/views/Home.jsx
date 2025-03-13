import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryLabel, VictoryPie, VictoryLegend } from 'victory'
import { FaMars, FaVenus, FaUsers, FaHouseUser, FaCommentsDollar, FaLeaf } from "react-icons/fa"
import { useFetchFarmers } from '../../hooks/useFetchFarmers'

export default function Home() {

    const { total, maleCount, femaleCount, civilStatusCounts, sourceOfIncomeCounts, topCrops, totalCrops } = useFetchFarmers()
    const civilStatusLabels = Object.keys(civilStatusCounts)
    const civilStatusData = civilStatusLabels.map(status => civilStatusCounts[status])
    const sourceOfIncomeLabels = Object.keys(sourceOfIncomeCounts)
    const sourceOfIncomeData = sourceOfIncomeLabels.map(status => sourceOfIncomeCounts[status])

    return (
        <Chakra.Box w='100%' h='100%' p='.1vw .1vw 2vw .1vw' overflow='auto' css={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }} sx={{ "&::-webkit-scrollbar": { display: "none", } }}>
            <Chakra.Box mt='1vw' display='flex'>
                <Chakra.Card p='2vw' cursor='pointer' _hover={{ bg: '#E8E8E8' }} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw'><FaUsers /></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{total}</Chakra.Text>
                    </Chakra.Box>
                </Chakra.Card>
                <Chakra.Card ml='1vw' p='2vw' cursor='pointer' _hover={{ bg: '#E8E8E8' }} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Male Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw'><FaMars color='#03b1fc' /></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{maleCount}</Chakra.Text>
                    </Chakra.Box>
                </Chakra.Card>
                <Chakra.Card ml='1vw' p='2vw' cursor='pointer' _hover={{ bg: '#E8E8E8' }} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Female Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw' color='#fa5282'><FaVenus /></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{femaleCount}</Chakra.Text>
                    </Chakra.Box>
                </Chakra.Card>
            </Chakra.Box>
            <Chakra.Heading mt='3vw' variant='content' textTransform='uppercase'>Insights</Chakra.Heading>
            <Chakra.Box mt='1vw' display='flex' flexDirection='column'>
                <Chakra.Box display='flex' justifyContent='space-between'>
                    <Chakra.Card w='49%' p='1.5vw' transition='.3s'>
                        <Chakra.Box display='flex' alignItems='center' justifyContent='center'>
                            <Chakra.Text mr='1vw' fontSize='1vw'><FaHouseUser /></Chakra.Text>
                            <Chakra.Text fontWeight='500'>Civil Status Breakdown</Chakra.Text>
                        </Chakra.Box>
                        <VictoryChart theme={VictoryTheme.material} domainPadding={30} height={200}>
                            <VictoryAxis
                                tickValues={civilStatusLabels}
                                style={{
                                    tickLabels: { fontSize: 8, padding: 7 }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    tickLabels: { fontSize: 7, padding: 7 }
                                }}
                            />
                            <VictoryBar
                                data={civilStatusLabels.map((status, index) => ({
                                    x: status,
                                    y: civilStatusData[index]
                                }))}
                                labels={({ datum }) => `${((datum.y / total) * 100).toFixed()}%`}
                                barWidth={35}
                                cornerRadius={{ top: 7 }}
                                style={{
                                    data: { fill: "#00ADB5" }
                                }}
                                labelComponent={<VictoryLabel dy={-5} style={{ fontSize: 7, fill: 'black' }} />}
                            />
                        </VictoryChart>
                    </Chakra.Card>
                    <Chakra.Card w='49%' p='1.5vw' transition='.3s'>
                        <Chakra.Box display='flex' alignItems='center' justifyContent='center'>
                            <Chakra.Text mr='1vw' fontSize='1vw'><FaCommentsDollar /></Chakra.Text>
                            <Chakra.Text fontWeight='500'>Income Source Breakdown</Chakra.Text>
                        </Chakra.Box>
                        <VictoryChart theme={VictoryTheme.material} domainPadding={30} height={200}>
                            <VictoryAxis
                                tickValues={sourceOfIncomeLabels}
                                style={{
                                    tickLabels: { fontSize: 8, padding: 7 }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    tickLabels: { fontSize: 7, padding: 7 }
                                }}
                            />
                            <VictoryBar
                                data={sourceOfIncomeLabels.map((status, index) => ({
                                    x: status,
                                    y: sourceOfIncomeData[index]
                                }))}
                                labels={({ datum }) => `${((datum.y / total) * 100).toFixed()}%`}
                                barWidth={35}
                                cornerRadius={{ top: 7 }}
                                style={{
                                    data: { fill: "#03b1fc" }
                                }}
                                labelComponent={<VictoryLabel dy={-5} style={{ fontSize: 7, fill: 'black' }} />}
                            />
                        </VictoryChart>
                    </Chakra.Card>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Heading mt='3vw' variant='content' textTransform='uppercase'>Farming & Production</Chakra.Heading>
            <Chakra.Box mt='1vw' display='flex' flexDirection='column'>
                <Chakra.Box display='flex' justifyContent='space-between'>
                    <Chakra.Card w='49%' p='1.5vw' transition='.3s'>
                        <Chakra.Box mb='1vw' display='flex' alignItems='center' justifyContent='center'>
                            <Chakra.Text mr='1vw' fontSize='1vw'><FaLeaf /></Chakra.Text>
                            <Chakra.Text fontWeight='500'>Top 5 Crops Grown</Chakra.Text>
                        </Chakra.Box>
                        {topCrops.length > 0 ? (
                            <Chakra.Box display="flex" alignItems="center" justifyContent="center">
                                <VictoryLegend
                                    x={40}
                                    y={80}
                                    width={250}
                                    colorScale={["#5ae68b", "#21e6fc", "#21a8fc", "#c66bfa", "#f576d7"]}
                                    data={topCrops.map((crop) => ({ name: `${crop.x.toUpperCase()} - (total ${crop.y})` }))}
                                    style={{
                                        labels: { fontSize: 10, fontWeight: 'bold' }
                                    }}
                                />
                                <VictoryPie
                                    innerRadius={45}
                                    data={topCrops}
                                    colorScale={["#5ae68b", "#21e6fc", "#21a8fc", "#c66bfa", "#f576d7"]}
                                    labels={({ datum }) => `${((datum.y / totalCrops) * 100).toFixed()}%`}
                                    labelRadius={85}
                                    padAngle={3} 
                                    cornerRadius={7} 
                                    style={{
                                        labels: { fontSize: 11, fontWeight: 'bold' }
                                    }}
                                    height={250}
                                    width={250}
                                />
                            </Chakra.Box>


                        ) : (
                            <Chakra.Text mt='2vw' textAlign='center'>No crop data available</Chakra.Text>
                        )}
                    </Chakra.Card>
                </Chakra.Box>
            </Chakra.Box>
        </Chakra.Box>
    )
}
