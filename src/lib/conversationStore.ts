import create from 'zustand';

type Conversation = {
  id: number;
  name: string;
};

type ConversationState = {
  conversations: Conversation[];
  addConversation: (name: string) => void;
  renameConversation: (id: number, newName: string) => void;
  deleteConversation: (id: number) => void;
  getConversationById: (id: number) => Conversation | undefined;
};

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],

  addConversation: (name: string) => {
    const id = get().conversations.length + 1;
    const newConversation: Conversation = { id, name };
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    }));
  },

  renameConversation: (id: number, newName: string) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, name: newName } : conv,
      ),
    }));
  },

  deleteConversation: (id: number) => {
    set((state) => ({
      conversations: state.conversations.filter((conv) => conv.id !== id),
    }));
  },

  getConversationById: (id: number) => {
    return get().conversations.find((conv) => conv.id === id);
  },
}));
