import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(message: string) {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      tools: [{
        googleSearchRetrieval: {}
      }],
    });
    
    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  }
}