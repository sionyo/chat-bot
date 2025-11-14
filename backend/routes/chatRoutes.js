import express from 'express';
import { 
  startConversation, 
  sendMessage, 
  getConversation 
} from '../controllers/chatController.js';

const router = express.Router();

// Start new conversation
router.post('/start', startConversation);

// Send message
router.post('/message', sendMessage);

// Get conversation history
router.get('/:guestId', getConversation);

// Add this test route
router.post('/test', async (req, res) => {
  try {
    console.log('🧪 Test route called');
    
    // Test database connection
    const testConv = await Conversation.findOne({ guestId: 'test' });
    console.log('✅ Database connection working');
    
    // Test OpenRouter service directly
    const testMessages = [
      { role: 'user', content: 'Hello, say TEST SUCCESS if you can read this.' }
    ];
    
    const aiTest = await openRouterService.sendMessage(testMessages);
    console.log('✅ OpenRouter test:', aiTest);
    
    res.json({
      database: 'connected',
      openRouter: aiTest.success ? 'working' : 'failed',
      openRouterResponse: aiTest
    });
    
  } catch (error) {
    console.error('❌ Test route error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;