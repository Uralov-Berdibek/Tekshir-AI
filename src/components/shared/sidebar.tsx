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
import { useRouter } from 'next/navigation';
import { useConversationStore } from '../../lib/conversationStore';

type Conversation = {
  id: number;
  name: string;
};

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  const [theme, setTheme] = useState<string | null>(null); // Set theme initially to null
  const { conversations, addConversation } = useConversationStore(); // Store the conversations
  const [open, setOpen] = useState(false); // Control modal visibility
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null); // Store current conversation for renaming
  const [newName, setNewName] = useState(''); // Store the new name for the conversation

  const router = useRouter();

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);

    if (typeof window !== 'undefined') {
      toggleTheme(initialTheme); // Ensure theme is toggled after hydration
    }
  }, []);

  const handleToggle = () => {
    if (theme) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      toggleTheme(newTheme);
    }
  };

  const newConversation = () => {
    const name = `Conversation ${conversations.length + 1}`;
    addConversation(name);

    const newId = conversations.length + 1;
    router.push(`/conversation/${newId}`); // Переход на страницу нового разговора
  };

  const handleRename = (conversation: Conversation) => {
    setCurrentConversation(conversation); // Set the conversation to rename
    setNewName(conversation.name); // Set the initial name in the input
    setOpen(true); // Open the modal
  };

  const onRename = () => {
    if (currentConversation) {
      useConversationStore.getState().renameConversation(currentConversation.id, newName);
      setOpen(false); // Close the modal after renaming
    }
  };

  const handleDelete = (id: number) => {
    useConversationStore.getState().deleteConversation(id);
  };

  if (theme === null) {
    // Render nothing until the theme is set
    return null;
  }

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

        <div className='px-4 py-1'>
          {/* Display the conversations */}
          {conversations.map((conversation) => (
            <ContextMenu key={conversation.id}>
              <ContextMenuTrigger
                className='flex items-center text-xl text-black dark:text-white mt-2 py-2 cursor-pointer'
                onClick={() => router.push(`/conversation/${conversation.id}`)}
              >
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
                <ContextMenuItem
                  onClick={() => handleDelete(conversation.id)}
                  className='text-red-700'
                >
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
