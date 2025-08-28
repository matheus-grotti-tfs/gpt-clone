import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Get the Gemini 1.5 Pro model and enable the search tool directly
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      tools: [{
        googleSearchRetrieval: {}
      }],
    });
    
    // Start a chat session to maintain context
    const chat = model.startChat();
    
    // Send the user's message to the model
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const reply = response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Error communicating with Gemini API' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 using Gemini 1.5 Pro with Google Search');
});