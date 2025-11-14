import React from 'react';

const Message = ({ message }) => {
  const { role, content, timestamp, isError } = message;
  const isUser = role === 'user';

  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'} ${isError ? 'error-message' : ''}`}>
      <div className="message-content">
        <p>{content}</p>
      </div>
      <div className="message-meta">
        <span className="message-time">
          {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Now'}
        </span>
      </div>
    </div>
  );
};

export default Message;