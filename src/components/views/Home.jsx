import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiUsers } from "react-icons/hi2"
import { useFetchFarmers } from '../../hooks/useFetchFarmers'

export default function Home() {

    const { total, maleCount, femaleCount } = useFetchFarmers()

    return (
        <Chakra.Box w='100%' h='100%' overflow='auto'>
            <Chakra.Heading variant='content' textTransform='uppercase'>Insights</Chakra.Heading>
            <Chakra.Box mt='1vw' display='flex'>
                <Chakra.Card p='2vw' cursor='pointer' _hover={{bg: '#E8E8E8'}} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw'><HiUsers/></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{total}</Chakra.Text>            
                    </Chakra.Box>
                </Chakra.Card>
                <Chakra.Card ml='1vw' p='2vw' cursor='pointer' _hover={{bg: '#E8E8E8'}} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Male Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw'><HiUsers/></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{maleCount}</Chakra.Text>            
                    </Chakra.Box>
                </Chakra.Card>
                <Chakra.Card ml='1vw' p='2vw' cursor='pointer' _hover={{bg: '#E8E8E8'}} transition='.3s'>
                    <Chakra.Text fontWeight='bold'>Total Female Farmers</Chakra.Text>
                    <Chakra.Box mt='1vw' display='flex' alignItems='center' justifyContent='center'>
                        <Chakra.Text mr='1vw' fontSize='2vw'><HiUsers/></Chakra.Text>
                        <Chakra.Text fontSize='2vw' fontWeight='bold'>{femaleCount}</Chakra.Text>            
                    </Chakra.Box>
                </Chakra.Card>
            </Chakra.Box>
        </Chakra.Box>
    )
}
