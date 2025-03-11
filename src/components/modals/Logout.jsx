import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiExclamationCircle } from "react-icons/hi2"
import { IoClose } from "react-icons/io5"
import { useAuth } from '../../config/Authentication'
import Toast from '../layouts/Toast'

export default function Logout({ isOpen, onClose }) {

    const { logout } = useAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const showToast = Toast()

    const handleLogout = () => {
        setIsLoading(true)

        try {
            showToast({ title: 'Success', description: `Logout successfully`, status: 'success', variant: 'solid', position: 'top', })
            logout()
        }

        catch (error) {
            showToast({ title: 'Error', description: `${error}`, status: 'error', variant: 'solid', position: 'top', })
        }

        finally {
            onClose()
            setIsLoading(false)
        }
    }

    return (
        <Chakra.Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <Chakra.ModalOverlay />
            <Chakra.ModalContent>
                <Chakra.ModalHeader p='0 0 1vw 0' display='flex' alignItems='center' justifyContent='space-between'>
                    <Chakra.Box display='flex' alignItems='center'>
                        <Chakra.Text mr='.5vw' variant='caption' fontSize='1.5vw' color='#EA5455' textAlign='center'>{<HiExclamationCircle />}</Chakra.Text>
                        <Chakra.Heading variant='content'>Confirm Logout</Chakra.Heading>
                    </Chakra.Box>
                    <Chakra.Button onClick={onClose} h='1.5vw' fontSize='xs' variant='primary' leftIcon={<Chakra.Icon as={IoClose} fontSize='md' />}>Cancel</Chakra.Button>
                </Chakra.ModalHeader>
                <hr />
                <Chakra.ModalBody p='0vw'>
                    <Chakra.Text m='1vw 0 1vw 0'> Are you sure you want to log out? You will need to sign in again to access your account.</Chakra.Text>
                    <hr />
                    <Chakra.Box mt='1vw' display='flex' justifyContent='right'>
                        <Chakra.Button onClick={handleLogout} isLoading={isLoading} h='1.7vw' mr='.5vw' variant='accent' fontSize='.7vw' > Yes, Logout</Chakra.Button>
                        <Chakra.Button onClick={onClose} h='1.7vw' fontSize='.7vw'>Cancel</Chakra.Button>
                    </Chakra.Box>
                </Chakra.ModalBody>
            </Chakra.ModalContent>
        </Chakra.Modal>
    )
}
