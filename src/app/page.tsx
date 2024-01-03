"use client"
import Header from '../components/Header';
import Textbar from '@/components/TextBar';
import Welcome from '@/components/Welcome';
import { useState } from 'react';

const ChatPage = () => {
  const [showChatPage, setShowChatPage] = useState(false);
  const [userData, setUserData] = useState('');
  const [roomData, setRoomData] = useState('');

  const handleUserDataSubmit = (userData: string, roomData: string) => {
    setUserData(userData);
    setRoomData(roomData);
    setShowChatPage(true);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      {showChatPage ? (
        <>
          <Header roomId={roomData} userId={userData} />
          <div className="flex flex-col h-[90%] bg-white items-center">
            <Textbar roomId={roomData} userId={userData} />
          </div>
        </>
      ) : (
        <Welcome onSubmit={handleUserDataSubmit} />
      )}
    </div>
  );
};

export default ChatPage;

