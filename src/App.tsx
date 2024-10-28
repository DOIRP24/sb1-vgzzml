import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Schedule from './components/Schedule';
import Chat from './components/Chat';
import Polls from './components/Polls';
import Participants from './components/Participants';
import { useStore } from './store/useStore';

function App() {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();
    
    // Get user data from Telegram
    const initUser = {
      id: WebApp.initDataUnsafe.user?.id || 0,
      name: WebApp.initDataUnsafe.user?.first_name || 'Anonymous',
      photoUrl: WebApp.initDataUnsafe.user?.photo_url || '',
      coins: 0,
      clickCount: 0
    };
    
    setUser(initUser);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-50">
        <Profile />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </main>
        
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;