import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import LoadingSpinner from '../UI/LoadingSpinner';
import { startConversation, sendMessage } from '../../services/api';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation when component mounts
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const newGuestId = 'guest_' + Math.random().toString(36).substr(2, 9);
        setGuestId(newGuestId);
        
        const response = await startConversation(newGuestId);
        if (response.messages) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error('Failed to start conversation:', error);
        setMessages([{
          role: 'assistant',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date()
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, []);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !guestId) return;

    // Add user message immediately
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(guestId, messageText);
      if (response.success) {
        setMessages(response.conversation.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            message={message} 
          />
        ))}
        {isLoading && <LoadingSpinner />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatContainer;