'use client';

import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import ChatView from './chat';
import Cards from './cards';
import FileMessage from './file-message'; // Import the new component

// Define the type for a message
interface Message {
  id: number;
  content: React.ReactNode; // Change to React.ReactNode
  isUser: boolean;
}

type Props = {};

const Main = (props: Props) => {
  // Specify the type for the messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSend = () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, content: userInput, isUser: true },
        {
          id: prevMessages.length + 2,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.',
          isUser: false,
        },
      ]);
      setUserInput('');
      setShowChat(true);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          content: <FileMessage fileName={file.name} fileType={file.type} />,
          isUser: true,
        },
        {
          id: prevMessages.length + 2,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.',
          isUser: false,
        },
      ]);
      setShowChat(true);
    }
  };

  return (
    <div className='flex w-full h-[calc(100vh-77px)] flex-col items-center justify-between bg-gray-100 dark:bg-gray-900 p-10'>
      {/* Cards section */}
      {!showChat && <Cards />}

      {/* Chats section */}
      {showChat && <ChatView messages={messages} />}

      {/* Bottom section for input, file upload, and action button */}
      <div className='w-full flex justify-center items-center space-x-4 mt-8'>
        {/* Input Field */}
        <div className='relative w-1/2'>
          <input
            type='text'
            placeholder='Enter your message'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10'
          />
          {/* Action Button */}
          <button
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-100 p-2 rounded-lg focus:ring-2'
            onClick={handleSend}
          >
            <Send className='w-5 h-5' />
          </button>
        </div>

        {/* File Upload Button */}
        <label className='flex items-center p-2 bg-gray-200 dark:bg-gray-700 dark:text-white text-primary rounded-lg cursor-pointer'>
          <Upload className='w-5 h-5 mr-2' />
          <span>Upload</span>
          <input
            type='file'
            accept='.txt,.pdf,.doc'
            className='hidden'
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default Main;
