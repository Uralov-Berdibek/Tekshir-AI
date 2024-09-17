// store/authStore.ts
import create from 'zustand';

type AuthState = {
  user: { username: string } | null;
  setUser: (user: { username: string } | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
