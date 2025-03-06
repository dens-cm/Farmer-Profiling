import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { LuSearch } from "react-icons/lu"
import logo from '../../assets/icon/logo.png'

export default function Header() {
    return (
        <Chakra.Box w='100%' p='.8vw 0 .8vw 0' display='flex' alignItems='center' justifyContent='space-between'>
            <Chakra.Box w='12%' display='flex' alignItems='center'>
                <Chakra.Image src={logo} alt='logo' w='1.7vw' mr='1vw'/>
                <Chakra.Heading>Farmers</Chakra.Heading>
            </Chakra.Box>
            <Chakra.InputGroup w='65%'>
                <Chakra.InputLeftElement><LuSearch /></Chakra.InputLeftElement>
                <Chakra.Input placeholder='Search...' />
            </Chakra.InputGroup>
            <Chakra.Box w='12%' display='flex' alignItems='center' justifyContent='right'>
                <Chakra.Avatar w='2vw' h='2vw' />
            </Chakra.Box>
        </Chakra.Box>
    )
}
