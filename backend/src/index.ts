import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GeminiService } from "./services/geminiService.js";
import { createChatRouter } from "./routes/chatRoutes.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found in .env file");
}

const app = express();
app.use(cors());
app.use(express.json());

const geminiService = new GeminiService(process.env.GEMINI_API_KEY);
app.use('/', createChatRouter(geminiService));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 using Gemini 1.5 Pro with Google Search');
});