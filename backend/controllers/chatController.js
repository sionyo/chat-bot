import Conversation from '../models/Conversation.js';
import openRouterService from '../services/openRouterService.js';  // Switch back to OpenRouter

// Start a new conversation for guest
export const startConversation = async (req, res) => {
  try {
    const { guestId } = req.body;

    if (!guestId) {
      return res.status(400).json({ error: 'Guest ID is required' });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({ guestId });

    if (!conversation) {
      // Create new conversation with welcome message
      conversation = new Conversation({
        guestId,
        messages: [
          {
            role: 'assistant',
            content: 'Hello! I\'m your AI Content Generation Assistant. I can help you create: blog posts, social media content, marketing copy, email newsletters, product descriptions, and more! What would you like to create today?'
          }
        ]
      });
      await conversation.save();
    }

    res.json({
      guestId: conversation.guestId,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Start conversation error:', error);
    res.status(500).json({ error: 'Failed to start conversation' });
  }
};

// Send message and get AI response
export const sendMessage = async (req, res) => {
  try {
    const { guestId, message } = req.body;

    console.log('📨 Received message:', { guestId, message });

    if (!guestId || !message) {
      return res.status(400).json({ error: 'Guest ID and message are required' });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({ guestId });
    
    if (!conversation) {
      conversation = new Conversation({ guestId });
    }

    // Add user message to conversation
    conversation.messages.push({
      role: 'user',
      content: message
    });

    console.log('💾 Saved user message, getting AI response...');

    // Prepare messages for OpenRouter (last 10 messages for context)
    const recentMessages = conversation.messages.slice(-10);
    const apiMessages = recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    console.log('🤖 Sending to OpenRouter:', apiMessages.length, 'messages');

    // Get AI response from OpenRouter
    const aiResponse = await openRouterService.sendMessage(apiMessages);

    console.log('🔮 OpenRouter response:', aiResponse.success ? 'Success' : 'Failed');

    if (!aiResponse.success) {
      console.error('❌ OpenRouter error:', aiResponse.error);
      return res.status(500).json({ error: aiResponse.error });
    }

    // Add AI response to conversation
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse.message
    });

    await conversation.save();
    console.log('✅ Conversation saved successfully');

    res.json({
      success: true,
      message: aiResponse.message,
      conversation: conversation.messages
    });

  } catch (error) {
    console.error('💥 Send message error:', error);
    res.status(500).json({ error: 'Failed to send message: ' + error.message });
  }
};

// Get conversation history
export const getConversation = async (req, res) => {
  try {
    const { guestId } = req.params;

    const conversation = await Conversation.findOne({ guestId });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      guestId: conversation.guestId,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to get conversation' });
  }
};