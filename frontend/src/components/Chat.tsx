import { useState } from 'react';
import { Box, Input, Button, VStack, Text, Container } from '@chakra-ui/react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/chat', {
        message: input
      });

      const aiMessage: Message = {
        text: response.data.reply,
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch" h="80vh">
        <Box flex={1} overflowY="auto" p={4} borderWidth={1} borderRadius="md">
          {messages.map((msg, index) => (
            <Box
              key={index}
              bg={msg.isUser ? 'blue.100' : 'gray.100'}
              p={3}
              borderRadius="md"
              mb={2}
              alignSelf={msg.isUser ? 'flex-end' : 'flex-start'}
            >
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </Box>
        <Box>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            mr={2}
          />
          <Button
            onClick={handleSend}
            isLoading={isLoading}
            colorScheme="blue"
            mt={2}
          >
            Send
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}