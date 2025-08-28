import { ChakraProvider, Box, Container } from '@chakra-ui/react'
import { Chat } from './components/Chat'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.lg" py={8}>
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="base"
            overflow="hidden"
            minH="80vh"
          >
            <Chat />
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
