import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileTextIcon, 
  PenToolIcon, 
  ZapIcon, 
  LightbulbIcon,  // Make sure this is spelled correctly
  MessageSquareIcon, 
  SparklesIcon 
} from '../components/UI/Icons'; // Make sure path is correct

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-section">
        <div className="logo-icon">
          <PenToolIcon size={48} color="white" />
        </div>
        <h1 className="home-title">Content Generation Assistant</h1>
      </div>
      
      <p className="home-subtitle">
        AI-powered content creation for blogs, social media, marketing copy, and more. 
        Generate engaging content in seconds.
      </p>
      
      <Link to="/bot" className="btn btn-primary">
        <ZapIcon size={20} color="white" />
        Start Creating Content
      </Link>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <FileTextIcon size={32} color="#667eea" />
          </div>
          <span>Blog Posts</span>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <MessageSquareIcon size={32} color="#667eea" />
          </div>
          <span>Social Media</span>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <LightbulbIcon size={32} color="#667eea" />
          </div>
          <span>Ideas & Outlines</span>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <SparklesIcon size={32} color="#667eea" />
          </div>
          <span>Marketing Copy</span>
        </div>
      </div>
    </div>
  );
};

export default Home;