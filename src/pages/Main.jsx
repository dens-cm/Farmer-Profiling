import React from 'react'
import * as Chakra from '@chakra-ui/react'
import Header from '../components/layouts/Header'
import NavigationBar from '../components/layouts/NavigationBar'
import Home from '../components/views/Home'
import Farmers from '../components/views/Farmers'

export default function App() {

  const [view, setView] = React.useState('home')

  return (
    <Chakra.Box w='100%' h='100%' p='0 2.5vw 0 2.5vw' display='flex' flexDirection='column'>
      <Header />
      <hr/>
      <Chakra.Box w='100%' h='100%' pt='1vw' display='flex' justifyContent='space-between'>
        <Chakra.Box w='12%' h='100%'>
          <NavigationBar view={view} setView={setView} />
        </Chakra.Box>
        <Chakra.Box w='82.5%' h='100%' overflow='auto'>
          {
            view === 'home' ? <Home />
              : view === 'farmers' ? <Farmers />
                : null
          }
        </Chakra.Box>
      </Chakra.Box>
    </Chakra.Box>
  )
}
