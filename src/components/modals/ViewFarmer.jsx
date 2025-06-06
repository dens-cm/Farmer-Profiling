import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { IoClose } from "react-icons/io5"
import { LuMapPin, LuPhone, LuMail, LuUserRound, LuFilePen, LuPrinter, LuTrash2 } from "react-icons/lu"
import { useFetchFarmerPersonalInformation } from '../../hooks/useFetchFarmerPersonalInformation'
import { useFetchFarmerChildren } from '../../hooks/useFetchFarmerChildren'
import { useFetchFarmerEducation } from '../../hooks/useFetchFarmerEducation'
import { useFetchFarmerCrop } from '../../hooks/useFetchFarmerCrops'
import { useFetchFarmerLivestock } from '../../hooks/useFetchFarmerLivestock'
import thumbnail from '../../assets/thumbnail.png'

export default function ViewFarmer({ isOpen, onClose, farmerId }) {

    const { personalInformation, loading, error } = useFetchFarmerPersonalInformation(farmerId)
    const { children, loading: childrenLoading, error: childrenError } = useFetchFarmerChildren(farmerId)
    const { education, loading: educationLoading, error: educationError } = useFetchFarmerEducation(farmerId)
    const { crop, loading: cropLoading, error: cropError } = useFetchFarmerCrop(farmerId)
    const { livestock, loading: livestockLoading, error: livestockError } = useFetchFarmerLivestock(farmerId)

    return (
        <Chakra.Modal isOpen={isOpen} onClose={onClose} size='full'>
            <Chakra.ModalContent w='100vw' h='100vh' p='0'>
                <Chakra.Box w='100%' h='100%' display='flex' flexDirection='column'>
                    <Chakra.ModalHeader p='.8vw 2.5vw .8vw 2.5vw' display='flex' alignItems='center' justifyContent='space-between'>
                        <Chakra.Heading display='flex' alignItems='center'><Chakra.Icon as={LuUserRound} mr='.4vw' />Farmer Details</Chakra.Heading>
                        <Chakra.Button onClick={onClose} h='1.5vw' fontSize='xs' variant='accent' leftIcon={<Chakra.Icon as={IoClose} fontSize='md' />}>Close</Chakra.Button>
                    </Chakra.ModalHeader>
                    <hr />
                    <Chakra.ModalBody w='100%' h='100%' p='1vw 2.5vw 2.5vw 2.5vw' bg='#F4F4F2' overflow='auto'>
                        {
                            loading ? (
                                <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                                    <Chakra.Spinner />
                                </Chakra.Box>
                            ) : error ? (
                                <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                                    <Chakra.Alert status='error' display='flex' flexDirection='column' alignItems='center' borderRadius='.7vw'>
                                        <Chakra.AlertIcon boxSize='1.2vw' />
                                        <Chakra.Text mt='.5vw' fontStyle='italic'>{error}</Chakra.Text>
                                    </Chakra.Alert>
                                </Chakra.Box>
                            ) : (
                                <Chakra.Box w='100%' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='49.1%'>
                                        <Chakra.Card p='2vw' display='flex' flexDirection='row'>
                                            <Chakra.Image src={personalInformation?.imageUrl || thumbnail} alt='profile image' w='10vw' h='10vw' objectFit='cover' border='.1vw solid rgb(177, 177, 177)' borderRadius='full' />
                                            <Chakra.Box w='100%' ml='2vw' display='flex' flexDirection='column' justifyContent='space-between' overflow='auto'>
                                                <Chakra.Box>
                                                    <Chakra.Heading fontSize='1.4vw' textTransform='capitalize' isTruncated>{personalInformation?.firstName} {personalInformation?.middleName} {personalInformation?.lastName} {personalInformation?.suffix}</Chakra.Heading>
                                                    <Chakra.Text mt='.5vw' textTransform='capitalize' display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuPhone /></Chakra.Text>{personalInformation?.cellphoneNo || 'N/A'}</Chakra.Text>
                                                    <Chakra.Text display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuMail /></Chakra.Text>{personalInformation?.emailAddress || 'N/A'}</Chakra.Text>
                                                    <Chakra.Text textTransform='capitalize' display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuMapPin /></Chakra.Text>{personalInformation?.address || 'N/A'}</Chakra.Text>
                                                </Chakra.Box>
                                                <hr />
                                                <Chakra.Box display='flex' justifyContent='right'>
                                                    <Chakra.Button leftIcon={<Chakra.Icon as={LuFilePen} fontSize='.8vw' />} h='1.5vw' mr='.5vw' fontSize='.7vw' variant='accent'>Edit</Chakra.Button>
                                                    <Chakra.Button leftIcon={<Chakra.Icon as={LuPrinter} fontSize='.8vw' />} h='1.5vw' fontSize='.7vw'>Print</Chakra.Button>
                                                </Chakra.Box>
                                            </Chakra.Box>
                                        </Chakra.Card>
                                        <Chakra.Card mt='1.5vw' p='2vw'>
                                            <Chakra.Heading variant='content'>Personal Information</Chakra.Heading>
                                            <Chakra.Box w='100%' h='.1vw' mt='.2vw' bg='#393E46' />
                                            <Chakra.Box w='100%' p='0 1vw 1.1vw 1vw'>
                                                <Chakra.Box w='100%' mt='.5vw' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Gender: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.gender}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Civil Status: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.civilStatus}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Date of Birth: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.dateOfBirth}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Place of Birth: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.placeOfBirth}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Height: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.height}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Weight: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.weight}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Citizenship: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.citizenship}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Religion: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.religion}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Telephone No: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.telephoneNo}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Blood Type: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.bloodType}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>IP Member: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.ipMember}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>4P's Memeber: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.fourPsMember}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Senior Citizen: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.seniorCitizen}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>PWD: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.pwd}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Source of Income: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.sourceOfIncome}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Monthly Income: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.monthlyIncome}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                            </Chakra.Box>
                                            <Chakra.Box w='100%' p='0 1vw 0 1vw'>
                                                <hr />
                                                <Chakra.Box w='100%' mt='1vw' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Organization Name: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.organizationName}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Cluster: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.cluster}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box w='100%' mb='1vw' display='flex'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Position: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.position}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Date of Membership: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.dateOfMembership}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <hr />
                                                <Chakra.Box w='100%' mt='.7vw' display='flex' justifyContent='left'>
                                                    <Chakra.Box w='50%'>
                                                        <Chakra.Text fontWeight='500' display='flex'>Years in Farming: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.yearsInFarming}</Chakra.Text></Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                            </Chakra.Box>
                                        </Chakra.Card>
                                        {
                                            personalInformation?.civilStatus !== 'Single' && (
                                                <Chakra.Card mt='1.5vw' p='2vw'>
                                                    <Chakra.Heading variant='content'>List of Legal Dependents</Chakra.Heading>
                                                    <Chakra.Box w='100%' h='.1vw' mt='.2vw' bg='#393E46' />
                                                    <Chakra.Box w='100%' p='0 1vw 0 1vw'>
                                                        <Chakra.Box w='100%' mt='.5vw' display='flex'>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Spouse Name: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{personalInformation?.spouseName || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                            <Chakra.Box w='40%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Date of Birth: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.spouseDateOfBirth || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                            <Chakra.Box w='10%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Age: <Chakra.Text ml='.5vw' fontWeight='400'>{personalInformation?.spouseAge || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                        {
                                                            childrenLoading ? (
                                                                <Chakra.Box w='100%' pt='.5vw'>
                                                                    <Chakra.Text variant='caption'>Loading...</Chakra.Text>
                                                                </Chakra.Box>
                                                            ) : childrenError ? (
                                                                <Chakra.Box w='100%' pt='.5vw'>
                                                                    <Chakra.Text variant='error'>{childrenError}</Chakra.Text>
                                                                </Chakra.Box>
                                                            ) : children.length > 0 ? (
                                                                children.map((child) => (
                                                                    <Chakra.Box key={child.id} w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Name: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{child.name || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='40%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Date of Birth: <Chakra.Text ml='.5vw' fontWeight='400'>{child.dateOfBirth || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='10%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Age: <Chakra.Text ml='.5vw' fontWeight='400'>{child.age || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                ))
                                                            ) : (
                                                                <Chakra.Box w='100%' pt='.5vw'>
                                                                    <Chakra.Text variant='caption'>N/A</Chakra.Text>
                                                                </Chakra.Box>
                                                            )
                                                        }
                                                    </Chakra.Box>
                                                </Chakra.Card>
                                            )
                                        }
                                        <Chakra.Card mt='1.5vw' p='2vw'>
                                            <Chakra.Heading variant='content'>Educational Attainment</Chakra.Heading>
                                            <Chakra.Box w='100%' h='.1vw' mt='.2vw' bg='#393E46' />
                                            {
                                                educationLoading ? (
                                                    <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                                                        <Chakra.Spinner />
                                                    </Chakra.Box>
                                                ) : educationError ? (
                                                    <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                                                        <Chakra.Text variant='error'>{error}</Chakra.Text>
                                                    </Chakra.Box>
                                                ) : (
                                                    <Chakra.Box w='100%' p='0 1vw 0 1vw'>
                                                        <Chakra.Box w='100%' pt='.5vw' display='flex'>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Elementary: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{education?.elementary || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Date Graduated: <Chakra.Text ml='.5vw' fontWeight='400'>{education?.elementaryGraduateYear || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                        <Chakra.Box w='100%' display='flex'>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>High School: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{education?.highSchool || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Date Graduated: <Chakra.Text ml='.5vw' fontWeight='400'>{education?.highSchoolGraduateYear || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                        <Chakra.Box w='100%' display='flex'>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>College: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{education?.college || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                            <Chakra.Box w='50%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Date Graduated: <Chakra.Text ml='.5vw' fontWeight='400'>{education?.collegeGraduateYear || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                        <Chakra.Box w='100%' display='flex'>
                                                            <Chakra.Box w='100%'>
                                                                <Chakra.Text fontWeight='500' display='flex'>Course: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{education?.course || 'N/A'}</Chakra.Text></Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                    </Chakra.Box>
                                                )
                                            }
                                        </Chakra.Card>
                                    </Chakra.Box>
                                    <Chakra.Box w='49.1%'>
                                        <Chakra.Card p='2vw'>
                                            <Chakra.Heading variant='content'>Main Crop</Chakra.Heading>
                                            <Chakra.Box w='100%' h='.1vw' mt='.2vw' bg='#393E46' />
                                            <Chakra.Box w='100%' p='0 1vw 0 1vw'>
                                                {
                                                    cropLoading ? (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='caption'>Loading...</Chakra.Text>
                                                        </Chakra.Box>
                                                    ) : cropError ? (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='error'>{childrenError}</Chakra.Text>
                                                        </Chakra.Box>
                                                    ) : crop.length > 0 ? (
                                                        crop.map((crop) => (
                                                            <Chakra.Box key={crop.id} w='100%' pt='1.5vw'>
                                                                <Chakra.Box w='100%' mb='1.5vw'>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Crop: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{crop.crop || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Variety: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{crop.variety || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Geo Location: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{crop.geoLocation || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>No. Trees: <Chakra.Text ml='.5vw' fontWeight='400'>{crop.noTrees || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Cultivated Area: <Chakra.Text ml='.5vw' fontWeight='400'>{crop.cultivatedAre || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Volume of Production: <Chakra.Text ml='.5vw' fontWeight='400'>{crop.volumeOfProduction || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Total Volume: <Chakra.Text ml='.5vw' fontWeight='400'>{crop.totalVolume || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Total Volume Sold: <Chakra.Text ml='.5vw' fontWeight='400'>{crop.totalVolumeSold || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                </Chakra.Box>
                                                                <hr />
                                                            </Chakra.Box>
                                                        ))
                                                    ) : (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='caption'>N/A</Chakra.Text>
                                                        </Chakra.Box>
                                                    )
                                                }
                                            </Chakra.Box>
                                        </Chakra.Card>
                                        <Chakra.Card mt='1.5vw' p='2vw'>
                                            <Chakra.Heading variant='content'>Livestock</Chakra.Heading>
                                            <Chakra.Box w='100%' h='.1vw' mt='.2vw' bg='#393E46' />
                                            <Chakra.Box w='100%' p='0 1vw 0 1vw'>
                                                {
                                                    livestockLoading ? (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='caption'>Loading...</Chakra.Text>
                                                        </Chakra.Box>
                                                    ) : livestockError ? (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='error'>{livestockError}</Chakra.Text>
                                                        </Chakra.Box>
                                                    ) : livestock.length > 0 ? (
                                                        livestock.map((livestock) => (
                                                            <Chakra.Box key={livestock.id} w='100%' pt='1.5vw'>
                                                                <Chakra.Box w='100%' mb='1.5vw'>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Livestock: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{livestock.livestock || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Breed: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{livestock.breed || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Geo Location: <Chakra.Text ml='.5vw' fontWeight='400' textTransform='capitalize'>{livestock.geoLocation || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Number of Heads: <Chakra.Text ml='.5vw' fontWeight='400'>{livestock.numberOfTrees || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                    <Chakra.Box w='100%' display='flex'>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Total Volume: <Chakra.Text ml='.5vw' fontWeight='400'>{livestock.totalVolume || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                        <Chakra.Box w='50%'>
                                                                            <Chakra.Text fontWeight='500' display='flex'>Total Volume Sold: <Chakra.Text ml='.5vw' fontWeight='400'>{livestock.totalVolumeSold || 'N/A'}</Chakra.Text></Chakra.Text>
                                                                        </Chakra.Box>
                                                                    </Chakra.Box>
                                                                </Chakra.Box>
                                                                <hr />
                                                            </Chakra.Box>
                                                        ))
                                                    ) : (
                                                        <Chakra.Box w='100%' pt='.5vw'>
                                                            <Chakra.Text variant='caption'>N/A</Chakra.Text>
                                                        </Chakra.Box>
                                                    )
                                                }
                                            </Chakra.Box>
                                        </Chakra.Card>
                                    </Chakra.Box>
                                </Chakra.Box>
                            )
                        }
                    </Chakra.ModalBody>
                </Chakra.Box>
            </Chakra.ModalContent>
        </Chakra.Modal>
    )
}
