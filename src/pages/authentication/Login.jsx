import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { LuUserRound } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../config/Authentication'
import Toast from '../../components/layouts/Toast'
export default function Login() {

    const { login } = useAuth()
    const email = React.useRef()
    const password = React.useRef()
    const [loading, setLoading] = React.useState()
    const navigate = useNavigate()
    const showToast = Toast()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login(email.current.value, password.current.value)
            showToast({ title: 'Success', description: `Logged in successfully`, status: 'success', variant: 'solid', position: 'top' })
            navigate('/')
        } catch (error) {
            showToast({ title: 'Error', description: `Error: ${error}`, status: 'error', variant: 'solid', position: 'top' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Chakra.Box w='100%' h='100%' bg='#353535' display='flex' alignItems='center' justifyContent='center'>
            <Chakra.Box w='30%' p='2vw' bg='white'>
                <Chakra.Box mb='.3vw' display='flex' alignItems='center' justifyContent='space-between'>
                    <Chakra.Heading fontSize='.8vw' textTransform='uppercase'>Login</Chakra.Heading>
                    <Chakra.Text fontSize='1vw'><LuUserRound /></Chakra.Text>
                </Chakra.Box>
                <hr />
                <form onSubmit={handleLogin}>
                    <Chakra.Box mt='1.5vw'>
                        <Chakra.Text fontSize='.9vw' fontWeight='500'>Email:</Chakra.Text>
                        <Chakra.Input required ref={email} variant='filled' type='email' h='2.2vw' fontSize='.9vw' fontWeight='400' placeholder='...' />
                        <Chakra.Text mt='1vw' fontSize='.9vw' fontWeight='400'>Password:</Chakra.Text>
                        <Chakra.Input required ref={password} variant='filled' type='password' h='2.2vw' mb='1vw' fontSize='.9vw' fontWeight='700' placeholder='...' />
                        <hr />
                        <Chakra.Button type='submit' isLoading={loading} w='100%' h='2.2vw' mt='1vw' bg='#3C6E71' color='white' fontSize='.9vw'>Continue</Chakra.Button>
                    </Chakra.Box>
                </form>
            </Chakra.Box>
        </Chakra.Box>
    )
}
