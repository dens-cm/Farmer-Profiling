import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiOutlineFaceFrown, HiArrowRightStartOnRectangle } from "react-icons/hi2"
import { IoClose } from "react-icons/io5"

export default function User({ isOpen, onClose, handleLogoutClick }) {
    return (
        <Chakra.Drawer isOpen={isOpen} onClose={onClose} w='100vw' placement='right'>
            <Chakra.DrawerOverlay />
            <Chakra.DrawerContent maxW='22vw' p='1vw' display='flex' flexDirection='column' justifyContent='space-between'>
                <Chakra.Box mt='5vw' display='flex' flexDirection='column' alignItems='center'>
                    <Chakra.Text mb='.5vw' variant='caption' fontSize='1.5vw' color='light.placeholder' textAlign='center'>{<HiOutlineFaceFrown />}</Chakra.Text>
                    <Chakra.Text variant='caption' color='light.placeholder' textAlign='center'>This feature is currently under development.</Chakra.Text>
                </Chakra.Box>
                <Chakra.Box display='flex'>
                    <Chakra.Button onClick={onClose} variant='accent' w='100%' h='1.7vw' fontSize='.7vw' leftIcon={<Chakra.Icon as={IoClose} fontSize='md' />}>Close</Chakra.Button>
                    <Chakra.Button onClick={handleLogoutClick} variant='warning' h='1.7vw' ml='.5vw' fontSize='.7vw' leftIcon={<Chakra.Icon as={HiArrowRightStartOnRectangle} fontSize='md' />}>Logout</Chakra.Button>
                </Chakra.Box>
            </Chakra.DrawerContent>
        </Chakra.Drawer>
    )
}
