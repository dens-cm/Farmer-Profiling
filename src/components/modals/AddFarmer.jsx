import React from 'react'
import { collection, addDoc, doc, runTransaction } from 'firebase/firestore'
import { firestoreDB } from '../../config/FirebaseConfig'
import * as Chakra from '@chakra-ui/react'
import { IoClose } from "react-icons/io5"
import { LuSend, LuPlus, LuTrash2 } from "react-icons/lu"
import Toast from '../layouts/Toast'

export default function AddFarmer({ isOpen, onClose }) {

    const showToast = Toast()
    const [loading, setLoading] = React.useState()
    const [personalInformation, setPersonalInformation] = React.useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        gender: '',
        civilStatus: '',
        placeOfBirth: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        citizenship: '',
        religion: '',
        bloodType: '',
        address: '',
        emailAddress: '',
        telephoneNo: '',
        cellphoneNo: '',
        sourceOfIncome: '',
        fourPsMember: '',
        ipMember: '',
        monthlyIncome: '',
        seniorCitizen: '',
        pwd: '',
        organizationName: '',
        cluster: '',
        position: '',
        dateOfMembership: '',
        yearsInFarming: '',
        spouseName: '',
        spouseDateOfBirth: '',
        spouseAge: ''
    })
    const [children, setChildren] = React.useState([
        {
            name: '',
            dateOfBirth: '',
            age: ''
        }
    ])

    const handlePersonalInformationChange = (e) => {
        setPersonalInformation({
            ...personalInformation,
            [e.target.name]: e.target.value
        })
    }

    const handleChildrenChange = (e, index = null) => {
        setChildren((prevData) => {
            const updatedChildren = [...prevData]
            updatedChildren[index] = {
                ...updatedChildren[index],
                [e.target.name]: e.target.value
            }

            return updatedChildren
        })
    }

    const handleAddChild = () => {
        setChildren([...children, { name: '', dateOfBirth: '', age: '' }])
    }

    const handleDeleteChild = (index) => {
        setChildren(children.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await runTransaction(firestoreDB, async (transaction) => {
                const farmerRef = await addDoc(collection(firestoreDB, 'farmers'), {})
                transaction.set(farmerRef, {})

                const personalInformationRef = doc(collection(firestoreDB, `farmers/${farmerRef.id}/personal_information`))
                transaction.set(personalInformationRef, { ...personalInformation })

                children.forEach((children) => {
                    if (children.name.trim() !== '') {
                        const childrenRef = doc(collection(firestoreDB, `farmers/${farmerRef.id}/childrens`))
                        transaction.set(childrenRef, { ...children })
                    }
                })

            })
            showToast({ title: 'Success', description: `Added in successfully`, status: 'success', variant: 'solid', position: 'top' })
            setPersonalInformation([])
            setChildren([])
        } catch (error) {
            showToast({ title: 'Error', description: `${error}`, status: 'Error', variant: 'solid', position: 'top' })
        } finally {
            setLoading(false)
            onClose()
        }
    }

    const handleClose = () => {
        onClose()
        setPersonalInformation([])
        setChildren([])
    }

    return (
        <Chakra.Modal isOpen={isOpen} onClose={onClose} size='full'>
            <Chakra.ModalContent p='0 2.5vw 0 2.5vw'>
                <Chakra.ModalHeader p='.5vw 0 .5vw 0' display='flex' alignItems='center' justifyContent='space-between'>
                    <Chakra.Heading>Add Farmer</Chakra.Heading>
                    {
                        loading && (
                            <Chakra.Box display='flex' alignItems='center'>
                                <Chakra.Spinner variant='caption' mr='.5vw' />
                                <Chakra.Text variant='caption'>saving...</Chakra.Text>
                            </Chakra.Box>
                        )
                    }

                    <Chakra.Button onClick={handleClose} h='1.8vw' fontSize='xs' variant='accent' leftIcon={<Chakra.Icon as={IoClose} fontSize='md' />}>Cancel</Chakra.Button>
                </Chakra.ModalHeader>
                <hr />
                <Chakra.ModalBody p='1.5vw 0 5vw 0'>
                    <form onSubmit={handleSubmit}>
                        <Chakra.Box w='100%' display='flex'>
                            <Chakra.Box w='30%'>
                                {/* Farmer Image */}
                            </Chakra.Box>
                            <Chakra.Box w='70%'>
                                <Chakra.Heading m='1.5vw 0 1.3vw 0' variant='content'>Personal Information</Chakra.Heading>
                                <Chakra.Box w='100%' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>First name:</Chakra.Text>
                                        <Chakra.Input required name='firstName' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Middle name:</Chakra.Text>
                                        <Chakra.Input name='middleName' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Last name:</Chakra.Text>
                                        <Chakra.Input required name='lastName' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Suffix:</Chakra.Text>
                                        <Chakra.Select name='suffix' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Jr'>Jr.</option>
                                            <option value='Sr'>Sr.</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Gender:</Chakra.Text>
                                        <Chakra.Select required name='gender' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Civil Status:</Chakra.Text>
                                        <Chakra.Select required name='civilStatus' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Single'>Single</option>
                                            <option value='Married'>Married</option>
                                            <option value='Separated'>Separated</option>
                                            <option value='Widowed'>Widowed</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='48.7%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Place of Birth:</Chakra.Text>
                                        <Chakra.Input required name='placeOfBirth' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Date of Birth:</Chakra.Text>
                                        <Chakra.Input required name='dateOfBirth' onChange={handlePersonalInformationChange} type='date' mt='.1vw' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Height:</Chakra.Text>
                                        <Chakra.Input required name='height' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Weight:</Chakra.Text>
                                        <Chakra.Input required name='weight' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Citizenship:</Chakra.Text>
                                        <Chakra.Select required name='citizenship' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Filipino'>Filipino</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Religion:</Chakra.Text>
                                        <Chakra.Select required name='religion' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Roman Catholic'>Roman Catholic</option>
                                            <option value='Muslim'>Muslim</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Blood Type:</Chakra.Text>
                                        <Chakra.Select required name='bloodType' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='A'>A</option>
                                            <option value='A+'>A+</option>
                                            <option value='A-'>A-</option>
                                            <option value='O'>O</option>
                                            <option value='O+'>O+</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='48.7%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Address (Purok, Barangay, Municipality/City, Province, ZIP Code):</Chakra.Text>
                                        <Chakra.Input required name='address' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='48.7%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Email Address:</Chakra.Text>
                                        <Chakra.Input name='emailAddress' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Telephone No.:</Chakra.Text>
                                        <Chakra.Input name='telephoneNo' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Cellphone No.:</Chakra.Text>
                                        <Chakra.Input name='cellphoneNo' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Source of Income:</Chakra.Text>
                                        <Chakra.Select required name='sourceOfIncome' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Employed'>Employed</option>
                                            <option value='Self-Employed'>Self-Employed</option>
                                            <option value='Business'>Business</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>4p's Member:</Chakra.Text>
                                        <Chakra.Select required name='fourPsMember' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Yes'>Yes</option>
                                            <option value='No'>No</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>IP Member:</Chakra.Text>
                                        <Chakra.Select required name='ipMember' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Yes'>Yes</option>
                                            <option value='No'>No</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Monthly Income:</Chakra.Text>
                                        <Chakra.Input name='monthlyIncome' type='number' required onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Senior Citizen:</Chakra.Text>
                                        <Chakra.Select required name='seniorCitizen' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='No'>No</option>
                                            <option value='Yes'>Yes</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>PWD:</Chakra.Text>
                                        <Chakra.Select required name='pwd' onChange={handlePersonalInformationChange} defaultValue=''>
                                            <option value='' disabled>select</option>
                                            <option value='Yes'>Yes</option>
                                            <option value='No'>No</option>
                                        </Chakra.Select>
                                    </Chakra.Box>
                                    <Chakra.Box w='48.7%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Organization Name:</Chakra.Text>
                                        <Chakra.Input name='organizationName' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Cluster:</Chakra.Text>
                                        <Chakra.Input name='cluster' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Position:</Chakra.Text>
                                        <Chakra.Input name='position' onChange={handlePersonalInformationChange} mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Date of Membership:</Chakra.Text>
                                        <Chakra.Input name='dateOfMembership' type='date' onChange={handlePersonalInformationChange} mt='.1vw' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Years in Farming:</Chakra.Text>
                                        <Chakra.Input name='yearsInFarming' onChange={handlePersonalInformationChange} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                <Chakra.Heading m='3.5vw 0 1.3vw 0' variant='content'>List of Leagl Dependents</Chakra.Heading>
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='48.7%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Name of Spouse:</Chakra.Text>
                                        <Chakra.Input name='spouseName' onChange={handlePersonalInformationChange} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Spouse Date of Birth:</Chakra.Text>
                                        <Chakra.Input name='spouseDateOfBirth' onChange={handlePersonalInformationChange} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                        <Chakra.Text>Spouse Age:</Chakra.Text>
                                        <Chakra.Input name='spouseAge' onChange={handlePersonalInformationChange} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                    </Chakra.Box>
                                </Chakra.Box>
                                {children.map((child, index) => (
                                    <Chakra.Box key={index} w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                        <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                            <Chakra.Text>Name of Children:</Chakra.Text>
                                            <Chakra.Input name='name' value={child.name} onChange={(e) => handleChildrenChange(e, index)} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                        </Chakra.Box>
                                        <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                            <Chakra.Text>Date of Birth:</Chakra.Text>
                                            <Chakra.Input name='dateOfBirth' type='date' value={child.dateOfBirth} onChange={(e) => handleChildrenChange(e, index)} required mt='.1vw' />
                                        </Chakra.Box>
                                        <Chakra.Box w='23%' display='flex' flexDirection='column'>
                                            <Chakra.Text>Age:</Chakra.Text>
                                            <Chakra.Input name='age' value={child.age} onChange={(e) => handleChildrenChange(e, index)} required mt='.1vw' textTransform='capitalize' placeholder='...' />
                                        </Chakra.Box>
                                        <Chakra.Box w='23%' display='flex' alignItems='flex-end' justifyContent='left'>
                                            {index >= 0 && (
                                                <Chakra.Button onClick={() => handleDeleteChild(index)} variant='warning' w='100%' h='2vw' fontSize='.7vw' leftIcon={<Chakra.Icon as={LuTrash2} fontSize='.8vw' />}>Delete</Chakra.Button>
                                            )}
                                        </Chakra.Box>
                                    </Chakra.Box>
                                ))}
                                <Chakra.Box w='100%' mt='1.5vw' display='flex' justifyContent='space-between'>
                                    <Chakra.Box w='23%' display='flex' flexDirection='column' />
                                    <Chakra.Box w='23%' display='flex' flexDirection='column' />
                                    <Chakra.Box w='23%' display='flex' flexDirection='column' />
                                    <Chakra.Box w='23%' display='flex' alignItems='flex-end' justifyContent='left'>
                                        <Chakra.Button onClick={handleAddChild} variant='accent' w='100%' h='2vw' fontSize='.7vw' leftIcon={<Chakra.Icon as={LuPlus} fontSize='.8vw' />}>Add Children</Chakra.Button>
                                    </Chakra.Box>
                                </Chakra.Box>
                            </Chakra.Box>
                        </Chakra.Box>
                        <Chakra.Box mt='2vw' display='flex' justifyContent='right'>
                            <Chakra.Button type='submit' leftIcon={<Chakra.Icon as={LuSend} fontSize='md' />} isLoading={loading}>Submit</Chakra.Button>
                        </Chakra.Box>
                    </form>
                </Chakra.ModalBody>
            </Chakra.ModalContent>
        </Chakra.Modal >
    )
}
