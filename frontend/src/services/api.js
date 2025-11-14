const API_BASE_URL = import.meta.env.VITE_API_URL

export const startConversation = async (guestId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error - startConversation:', error);
    throw error;
  }
};

export const sendMessage = async (guestId, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestId, message }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error - sendMessage:', error);
    throw error;
  }
};

export const getConversation = async (guestId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/${guestId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error - getConversation:', error);
    throw error;
  }
};