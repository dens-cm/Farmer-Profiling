import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { LuUserRoundPlus } from "react-icons/lu"
import AddFarmer from '../modals/AddFarmer'
import ListOfFarmers from '../tables/ListOfFarmers'

export default function Farmers() {

    const { isOpen: isOpenFarmerModal, onOpen: onOpenFarmerModal, onClose: onCLoseFarmerModal } = Chakra.useDisclosure()

    return (
        <Chakra.Box w='100%'>
            <Chakra.Heading variant='content'>List of Farmers</Chakra.Heading>
            <Chakra.Box mt='.7vw' display='flex' justifyContent='right'>
                <Chakra.Button onClick={onOpenFarmerModal} h='1.8vw' fontSize='xs' variant='highlight' leftIcon={<Chakra.Icon as={LuUserRoundPlus} fontSize='md' />}>Add farmer</Chakra.Button>
            </Chakra.Box>
            <Chakra.Box mt='1vw' p='1vw' bg='white' borderRadius='.7vw'>
                <ListOfFarmers/>
            </Chakra.Box>

            <AddFarmer isOpen={isOpenFarmerModal} onClose={onCLoseFarmerModal} />
        </Chakra.Box>
    )
}
