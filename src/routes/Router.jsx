import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, Authentication } from '../config/Authentication'
import Main from '../pages/Main'
import Login from '../pages/authentication/Login'

export default function App() {

    const PrivateRoutes = ({ children, publicOnly = false }) => {
        const { currentUser } = useAuth()
        const location = useLocation()

        if (currentUser && publicOnly) {
            return <Navigate to="/" />
        }

        if (!currentUser && !publicOnly) {
            return <Navigate to="/login" state={{ from: location }} />
        }

        return children
    }

    return (
        <Box w='100vw' h='100vh'>
            <Router>
                <Authentication>
                    <Routes>
                        <Route exact path='/' element={<PrivateRoutes> <Main /> </PrivateRoutes>} />
                        <Route exact path='/login' element={<PrivateRoutes publicOnly={true}> <Login /> </PrivateRoutes>} />
                    </Routes>
                </Authentication>
            </Router>
        </Box>
    )
}
