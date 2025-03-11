import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { IoClose } from "react-icons/io5"
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu"
import { useFetchFarmerPersonalInformation } from '../../hooks/useFetchFarmerPersonalInformation'
import { useDeleteFarmer } from '../../hooks/useDeleteFarmer'
import thumnail from '../../assets/thumbnail.png'
import errorIcon from '../../assets/icon/error.png'

export default function DeleteFarmer({ isOpen, onClose, farmerId }) {

  const { personalInformation, loading, error } = useFetchFarmerPersonalInformation(farmerId)
  const { deleteFarmer, loading: deleteFarmerLoading, error: deleteFarmerError } = useDeleteFarmer()

  return (
    <Chakra.Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <Chakra.ModalOverlay />
      <Chakra.ModalContent>
        <Chakra.ModalHeader p='0 0 1vw 0' display='flex' alignItems='center' justifyContent='space-between'>
          <Chakra.Box display='flex' alignItems='center'>
            <Chakra.Image src={errorIcon} alt='error' w='1.5vw' mr='.5vw' />
            <Chakra.Heading variant='content' isDisabled={loading || deleteFarmerLoading}>Delete Farmer</Chakra.Heading>
          </Chakra.Box>
          <Chakra.Button onClick={onClose} h='1.5vw' fontSize='xs' variant='primary' leftIcon={<Chakra.Icon as={IoClose} fontSize='md' />}>Cancel</Chakra.Button>
        </Chakra.ModalHeader>
        <hr />
        <Chakra.ModalBody p='1vw 0 0 0'>
          {
            loading ? (
              <Chakra.Box w='100%'>
                <Chakra.Text variant='caption'>Loading...</Chakra.Text>
              </Chakra.Box>
            ) : error || deleteFarmerError ? (
              <Chakra.Box w='100%'>
                <Chakra.Alert status='error' variant='left-accent'>
                  <Chakra.AlertIcon />
                  {error || deleteFarmerError}
                </Chakra.Alert>
              </Chakra.Box>
            ) : (
              <Chakra.Box>
                <Chakra.Box w='100%' mb='1vw' display='flex' justifyContent='space-between'>
                  <Chakra.Box w='35%' display='flex' justifyContent='left'>
                    <Chakra.Image src={personalInformation?.imageUrl || thumnail} alt='profile image' w='80%' h='7.7vw' objectFit='cover' border='.1vw solid rgb(177, 177, 177)' borderRadius='.9vw' />
                  </Chakra.Box>
                  <Chakra.Box w='65%' pt='.5vw'>
                    <Chakra.Heading textTransform='capitalize' isTruncated>{personalInformation?.firstName} {personalInformation?.middleName} {personalInformation?.lastName} {personalInformation?.suffix}</Chakra.Heading>
                    <Chakra.Text mt='.5vw' textTransform='capitalize' display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuPhone /></Chakra.Text>{personalInformation?.cellphoneNo || 'N/A'}</Chakra.Text>
                    <Chakra.Text display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuMail /></Chakra.Text>{personalInformation?.emailAddress || 'N/A'}</Chakra.Text>
                    <Chakra.Text textTransform='capitalize' display='flex' alignItems='center'><Chakra.Text mr='.5vw'><LuMapPin /></Chakra.Text>{personalInformation?.address || 'N/A'}</Chakra.Text>
                  </Chakra.Box>
                </Chakra.Box>
                <hr />
                <Chakra.Alert mt='1vw' mb='1vw' status='error' display='flex' flexDirection='column' alignItems='center' borderRadius='.7vw'>
                  <Chakra.AlertIcon boxSize='1.2vw' />
                  <Chakra.Text mt='.5vw' fontStyle='italic'><strong>Warning:</strong> This action is <strong>permanent</strong> and <strong>cannot be undone</strong>.</Chakra.Text>
                  <Chakra.Text mt='.5vw' display='flex' alignItems='center'>Are you sure you want to delete <strong><Chakra.Text m='0 .3vw 0 .3vw' textTransform='capitalize'>{personalInformation?.firstName} {personalInformation?.lastName} {personalInformation?.suffix}</Chakra.Text></strong> data? </Chakra.Text>
                </Chakra.Alert>
              </Chakra.Box>
            )
          }
          <hr />
          <Chakra.Box mt='1vw' display='flex' justifyContent='right'>
            <Chakra.Button onClick={async () => { await deleteFarmer(farmerId), onClose() }} isLoading={loading || deleteFarmerLoading} h='1.7vw' mr='.5vw' variant='warning' fontSize='.7vw' > Yes, Delete it! </Chakra.Button>
            <Chakra.Button onClick={onClose} h='1.7vw' variant='accent' fontSize='.7vw' isDisabled={loading || deleteFarmerLoading}>No, Keep it.</Chakra.Button>
          </Chakra.Box>
        </Chakra.ModalBody>
      </Chakra.ModalContent>
    </Chakra.Modal>
  )
}
