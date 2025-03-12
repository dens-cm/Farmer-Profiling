import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { FaUserPlus } from "react-icons/fa"
import { useFetchFarmers } from '../../hooks/useFetchFarmers'
import AddFarmer from '../modals/AddFarmer'
import ViewFarmer from '../modals/ViewFarmer'
import DeleteFarmer from '../modals/DeleteFarmer'
import ListOfFarmers from '../tables/ListOfFarmers'

export default function Farmers() {

    const { data, loading, total, error } = useFetchFarmers()
    const [ farmerId, setFarmerId ] = React.useState(null)
    const { isOpen: isOpenAddFarmerModal, onOpen: onOpenAddFarmerModal, onClose: onCLoseAddFarmerModal } = Chakra.useDisclosure()
    const { isOpen: isOpenViewFarmerModal, onOpen: onOpenViewFarmerModal, onClose: onCLoseViewFarmerModal } = Chakra.useDisclosure()
    const { isOpen: isOpenDeleteFarmerModal, onOpen: onOpenDeleteFarmerModal, onClose: onCLoseDeleteFarmerModal } = Chakra.useDisclosure()

    return (
        <Chakra.Box w='100%' h='100%' display='flex' flexDirection='column' overflow='auto'>
            <Chakra.Heading mt='1vw' variant='content'>List of Farmers</Chakra.Heading>
            <Chakra.Box mt='2vw' display='flex' alignItems='flex-end' justifyContent='space-between'>
                <Chakra.Text variant='caption'>Total Farmers: {total}</Chakra.Text>
                <Chakra.Button onClick={onOpenAddFarmerModal} h='1.8vw' fontSize='xs' variant='highlight' leftIcon={<Chakra.Icon as={FaUserPlus} fontSize='md' />}>Add farmer</Chakra.Button>
            </Chakra.Box>
            <Chakra.Box h='100%' m='1vw 0 1vw 0' p='0 1vw 0 1vw' bg='white' borderRadius='.7vw' overflow='auto'>
                <ListOfFarmers onOpenViewFarmerModal={onOpenViewFarmerModal} onOpenDeleteFarmerModal={onOpenDeleteFarmerModal} data={data} loading={loading} error={error} farmerId={setFarmerId}/>
            </Chakra.Box>
            {/* modal */}
            <AddFarmer isOpen={isOpenAddFarmerModal} onClose={onCLoseAddFarmerModal}/>
            <ViewFarmer isOpen={isOpenViewFarmerModal} onClose={onCLoseViewFarmerModal} onOpenDeleteFarmerModal={onOpenDeleteFarmerModal} farmerId={farmerId}/>
            <DeleteFarmer isOpen={isOpenDeleteFarmerModal} onClose={onCLoseDeleteFarmerModal} farmerId={farmerId}/>
        </Chakra.Box>
    )
}
