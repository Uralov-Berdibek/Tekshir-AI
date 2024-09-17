import { create } from 'zustand';

// Define the type for a conversation
interface Conversation {
  id: number;
  name: string;
}

// Define the state for Zustand store
interface AppState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  showChat: boolean;
  addConversation: (name: string) => void;
  setCurrentConversation: (conversation: Conversation) => void;
  toggleShowChat: (show: boolean) => void;
}

// Create the Zustand store
export const useAppStore = create<AppState>((set) => ({
  conversations: [],
  currentConversation: null,
  showChat: false,

  // Add a new conversation
  addConversation: (name: string) =>
    set((state) => ({
      conversations: [...state.conversations, { id: state.conversations.length + 1, name }],
    })),

  // Set the current conversation
  setCurrentConversation: (conversation: Conversation) =>
    set(() => ({
      currentConversation: conversation,
    })),

  // Toggle showChat to control visibility of the chat
  toggleShowChat: (show: boolean) =>
    set(() => ({
      showChat: show,
    })),
}));
