import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme/index'
import Router from './routes/Router'

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <Router />
    </StrictMode>
  </ChakraProvider>
)
