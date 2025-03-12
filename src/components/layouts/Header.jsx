import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import { LuSearch } from "react-icons/lu"
import { HiOutlineBell, HiOutlineSun, HiOutlineMoon, HiOutlineFaceFrown } from "react-icons/hi2"
import User from '../drawer/User'
import Logout from '../modals/Logout'
import logo from '../../assets/icon/logo.png'

export default function Header() {

    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
    const { isOpen: isOpenLogoutModal, onOpen: onOpenLogoutModal, onClose: onCloseLogoutModal } = Chakra.useDisclosure()

    const handleLogoutClick = () => {
        onClose()
        onOpenLogoutModal()
    }

    return (
        <Chakra.Box w='100%' p='.8vw 0 .8vw 0' display='flex' alignItems='center' justifyContent='space-between'>
            <Chakra.Box w='12%' display='flex' alignItems='center'>
                <Chakra.Image src={logo} alt='logo' w='1.7vw' mr='1vw' />
                <Chakra.Heading>Farmers</Chakra.Heading>
            </Chakra.Box>
            <Chakra.InputGroup w='60%'>
                <Chakra.InputLeftElement><LuSearch /></Chakra.InputLeftElement>
                <Chakra.Input placeholder='Search farmer...' />
            </Chakra.InputGroup>
            <Chakra.Box w='17%' display='flex' alignItems='center' justifyContent='right'>
                <Chakra.Menu>
                    <Chakra.MenuButton h='1.8vw' mr='1vw' p='.5vw .5vw .5vw .5vw' fontSize='.7vw' as={Chakra.Button} leftIcon={<HiOutlineBell size='1vw' strokeWidth='.1vw' />} borderRadius='full'>Notifications</Chakra.MenuButton>
                    <Chakra.MenuList display='flex' flexDirection='column' alignItems='center'>
                        <Chakra.Text mb='.5vw' variant='caption' fontSize='1.5vw' color='light.placeholder' textAlign='center'>{<HiOutlineFaceFrown />}</Chakra.Text>
                        <Chakra.Text variant='caption' color='light.placeholder' textAlign='center'>This feature is currently under development.</Chakra.Text>
                    </Chakra.MenuList>
                </Chakra.Menu>
                {
                    colorMode === 'dark' ? (
                        <Chakra.Icon onClick={toggleColorMode} as={HiOutlineSun} mr='1vw' cursor='pointer' />
                    ) : (
                        <Chakra.Icon onClick={toggleColorMode} as={HiOutlineMoon} mr='1vw' cursor='pointer' />
                    )
                }
                <Chakra.Avatar onClick={onOpen} w='1.7vw' h='1.7vw' cursor='pointer' />
            </Chakra.Box>
            {/* Drawer */}
            <User isOpen={isOpen} onClose={onClose} handleLogoutClick={handleLogoutClick} />
            {/* Modal */}
            <Logout isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal} />
        </Chakra.Box>
    )
}
