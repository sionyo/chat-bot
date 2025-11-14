import React from 'react';
import ChatContainer from '../components/Chat/ChatContainer';
import { PenToolIcon } from '../components/UI/Icons';

const ChatBot = () => {
  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="header-content">
          <div className="header-icon">
            <PenToolIcon size={28} color="white" />
          </div>
          <div className="header-text">
            <h1>Content Generation Assistant</h1>
            <div className="header-subtitle">What would you like to create today?</div>
          </div>
        </div>
      </header>
      <ChatContainer />
    </div>
  );
};

export default ChatBot;