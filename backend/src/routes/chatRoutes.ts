import { Router } from 'express';
import { GeminiService } from '../services/geminiService.js';

export function createChatRouter(geminiService: GeminiService) {
  const router = Router();

  router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
      const reply = await geminiService.generateResponse(message);
      res.json({ reply });
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      res.status(500).json({ error: 'Error communicating with Gemini API' });
    }
  });

  return router;
}