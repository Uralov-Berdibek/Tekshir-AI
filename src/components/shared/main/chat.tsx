'use client';

import { SquarePen } from 'lucide-react';
import { Button } from '../../ui/button';

type Message = {
  id: number;
  content: React.ReactNode; // Ensure content can be React nodes
  isUser: boolean; // true if the message is from the user
};

type Props = {
  messages: Message[];
};

const ChatView = ({ messages }: Props) => {
  return (
    <div className='bg-transparent p-6 space-y-4 overflow-y-auto h-full'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start p-4 rounded-md shadow-md ${
            message.isUser ? 'bg-white dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <div className='flex items-center'>
            <p className='text-gray-900 dark:text-gray-100'>{message.content}</p>
          </div>

          {message.isUser && (
            <Button
              className='ml-4 bg-gray-200 dark:bg-gray-600 dark:text-white text-primary border-none'
              variant='outline'
            >
              <SquarePen className='w-5 h-5' />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatView;
