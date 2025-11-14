import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables directly in this file
dotenv.config();

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    console.log('🔑 OpenRouter API Key:', this.apiKey ? `Loaded (${this.apiKey.substring(0, 10)}...)` : 'MISSING!');
  }

  async sendMessage(messages) {
    try {
      console.log('🔑 API Key in sendMessage:', this.apiKey ? 'Present' : 'Missing');
      
      if (!this.apiKey) {
        throw new Error('OpenRouter API key not found in environment variables');
      }

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'mistralai/mistral-7b-instruct:free', // Free model
          messages: messages,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter
            'X-Title': 'AI Chatbot' // Required by OpenRouter
          },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('✅ OpenRouter Response Received');
      return {
        success: true,
        message: response.data.choices[0].message.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('❌ OpenRouter API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to get response from AI'
      };
    }
  }
}

export default new OpenRouterService();