import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiMiniHome } from "react-icons/hi2"
import { FaUsers } from "react-icons/fa"

export default function NavigationBar({ view, setView }) {
    return (
        <Chakra.Box w='100%' h='100%' display='flex' flexDirection='column'>
            <Chakra.Button variant={view === 'home' ? 'activeTransparent' : 'transparent'} onClick={() => {setView('home')}} leftIcon={<Chakra.Icon as={HiMiniHome}/>} display='flex' justifyContent='left'>Home</Chakra.Button>
            <Chakra.Button variant={view === 'farmers' ? 'activeTransparent' : 'transparent'} onClick={() => {setView('farmers')}} leftIcon={<Chakra.Icon as={FaUsers}/>} mt='.5vw' display='flex' justifyContent='left'>Farmers</Chakra.Button>
        </Chakra.Box>
    )
}
