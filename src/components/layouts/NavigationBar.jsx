import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import { LuHouse, LuUsersRound } from "react-icons/lu"

export default function NavigationBar({ view, setView }) {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Chakra.Box w='100%' h='100%' display='flex' flexDirection='column'>
            <Chakra.Button variant={view === 'home' ? 'activeTransparent' : 'transparent'} onClick={() => {setView('home')}} leftIcon={<Chakra.Icon as={LuHouse}/>} display='flex' justifyContent='left'>Home</Chakra.Button>
            <Chakra.Button variant={view === 'farmers' ? 'activeTransparent' : 'transparent'} onClick={() => {setView('farmers')}} leftIcon={<Chakra.Icon as={LuUsersRound}/>} mt='.5vw' display='flex' justifyContent='left'>Farmers</Chakra.Button>
            <Chakra.Button variant="primary" onClick={toggleColorMode} mt='.5vw'>{colorMode === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}</Chakra.Button>
        </Chakra.Box>
    )
}
