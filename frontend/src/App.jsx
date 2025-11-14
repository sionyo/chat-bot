import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatBot from './pages/ChatBot';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bot" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;