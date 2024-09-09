'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

// icons
import {
  MessageSquare,
  Sun,
  Trash2,
  User,
  Globe,
  LogOut,
  Moon,
  Share2,
  SquarePen,
} from 'lucide-react';

// Local Storage
import { getInitialTheme, toggleTheme } from '../../utils/theme';
import RenameModal from '../global/rename-modal';

type Conversation = {
  id: number;
  name: string;
};

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  const [theme, setTheme] = useState(getInitialTheme());
  const [conversations, setConversations] = useState<Conversation[]>([]); // Store the conversations
  const [open, setOpen] = useState(false); // Control modal visibility
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null); // Store current conversation for renaming
  const [newName, setNewName] = useState(''); // Store the new name for the conversation

  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const newConversation = () => {
    const newConv: Conversation = {
      id: conversations.length + 1, // Generate a new ID
      name: 'New Conversation',
    };
    setConversations([...conversations, newConv]); // Add the new conversation to the list
  };

  const handleRename = (conversation: Conversation) => {
    setCurrentConversation(conversation); // Set the conversation to rename
    setNewName(conversation.name); // Set the initial name in the input
    setOpen(true); // Open the modal
  };

  const onRename = () => {
    if (currentConversation) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === currentConversation.id ? { ...conv, name: newName } : conv,
        ),
      );
      setOpen(false); // Close the modal after renaming
    }
  };

  const handleDelete = (id: number) => {
    setConversations((prevConversations) => prevConversations.filter((conv) => conv.id !== id));
  };

  return (
    <div className='h-[calc(100vh-80px)] w-3/4 sm:w-1/4 flex flex-col border-r bg-gray-100 dark:bg-gray-900'>
      {/* Sidebar content */}
      <div className='flex-1 overflow-y-auto'>
        <div className='px-4 py-3'>
          <Button
            className='w-full py-6 text-base dark:text-white bg-gray-200 dark:bg-gray-700 border-none'
            variant='outline'
            onClick={newConversation} // Handle click to add a new conversation
          >
            New chat
          </Button>
        </div>

        <div className='px-4 py-3'>
          {/* Display the conversations */}
          {conversations.map((conversation) => (
            <ContextMenu key={conversation.id}>
              <ContextMenuTrigger className='flex items-center text-xl text-black dark:text-white mt-2 py-2'>
                <MessageSquare className='mr-2' />
                {conversation.name}
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <Share2 className='mr-2' />
                  Share
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleRename(conversation)}>
                  <SquarePen className='mr-2' />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDelete(conversation.id)}>
                  <Trash2 className='mr-2' /> Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </div>

      {/* Footer with theme and other icons */}
      <div className='flex justify-between items-center p-3 border-t'>
        <Button
          className='py-6 text-base dark:text-white bg-gray-200 dark:bg-gray-700 border-none'
          variant='outline'
          onClick={handleToggle}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </Button>
        <Button
          className='py-6 text-base dark:text-white bg-gray-200 dark:bg-gray-700 border-none'
          variant='outline'
        >
          <User />
        </Button>
        <Button
          className='py-6 text-base dark:text-white bg-gray-200 dark:bg-gray-700 border-none'
          variant='outline'
        >
          <Globe />
        </Button>
        <Button
          className='py-6 text-base dark:text-white bg-gray-200 dark:bg-gray-700 border-none'
          variant='outline'
        >
          <LogOut />
        </Button>
      </div>

      {/* Modal for renaming conversation */}
      <RenameModal
        open={open}
        setOpen={setOpen}
        newName={newName}
        onRename={onRename}
        setNewName={setNewName}
      />
    </div>
  );
};

export default Sidebar;
