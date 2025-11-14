import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables in this file too
dotenv.config();

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    console.log('🔑 Gemini Service - API Key:', this.apiKey ? `Loaded (${this.apiKey.substring(0, 10)}...)` : 'MISSING!');
  }

  async sendMessage(messages) {
    try {
      console.log('🔑 Gemini API Key in sendMessage:', this.apiKey ? 'Present' : 'Missing');
      
      if (!this.apiKey) {
        return {
          success: false,
          error: 'Gemini API key not found in environment variables'
        };
      }

      // Convert our chat format to Gemini format
      const conversationContext = this.formatConversation(messages);
      
      console.log('🚀 Sending to Gemini API...');
      
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: conversationContext,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000
        }
      );

      console.log('✅ Gemini API Response Received');
      
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        message: aiResponse,
        usage: response.data.usageMetadata
      };
      
    } catch (error) {
      console.error('❌ Gemini API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      let userMessage = 'Failed to get response from AI';
      
      if (error.response?.status === 429) {
        userMessage = 'Rate limit exceeded. Please try again in a moment.';
      } else if (error.response?.data?.error?.message) {
        userMessage = error.response.data.error.message;
      }
      
      return {
        success: false,
        error: userMessage
      };
    }
  }

  // Convert our chat history to Gemini format
  formatConversation(messages) {
    const contents = [];
    
    messages.forEach(msg => {
      if (msg.role === 'user') {
        contents.push({
          parts: [{ text: msg.content }],
          role: 'user'
        });
      } else if (msg.role === 'assistant') {
        contents.push({
          parts: [{ text: msg.content }],
          role: 'model'
        });
      }
    });
    
    return contents;
  }
}

export default new GeminiService();