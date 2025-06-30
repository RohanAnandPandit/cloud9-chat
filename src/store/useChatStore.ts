import { create } from 'zustand';
import type { Message } from '@ai-sdk/react';
import { ThemeMode } from '@/lib/enums';


interface ChatState {
  // State
  title: string;
  theme: ThemeMode;
  showDebug: boolean;
  messages: Message[];
  input: string;
  pendingToolCallConfirmation: boolean;
  agent: any;
  agentChat: any;
  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  toggleDebug: () => void;
  setShowDebug: (show: boolean) => void;
  setPendingToolCallConfirmation: (pending: boolean) => void;
  stop: () => void;
  clearHistory: () => void;
  setAgentChat: (agent: any, agentChat: any) => void;
  suggestions: string[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  setAgentChat: (agent, agentChat) => set({ agent, agentChat }),
  // Initial state
  title: "AI Chat Agent",
  theme: (() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as ThemeMode) || ThemeMode.DARK;
  })(),
  showDebug: false,
  messages: [],
  input: '',
  pendingToolCallConfirmation: false,
  agent: null,
  agentChat: null,
  suggestions: [
    'Weather information for any city',
    'Local time in different locations'
  ],
  // Actions
  setTheme: (theme: ThemeMode) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    if (theme === ThemeMode.DARK) {
      document.documentElement.classList.add(ThemeMode.DARK);
      document.documentElement.classList.remove(ThemeMode.LIGHT);
    } else {
      document.documentElement.classList.remove(ThemeMode.DARK);
      document.documentElement.classList.add(ThemeMode.LIGHT);
    }
  },

  toggleDebug: () => {
    set((state: ChatState) => ({ showDebug: !state.showDebug }));
  },

  setShowDebug: (show: boolean) => {
    set({ showDebug: show });
  },

  setPendingToolCallConfirmation: (pending: boolean) => {
    set({ pendingToolCallConfirmation: pending });
  },

  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    set({ theme: newTheme });
    localStorage.setItem("theme", newTheme);
    if (newTheme === ThemeMode.DARK) {
      document.documentElement.classList.add(ThemeMode.DARK);
      document.documentElement.classList.remove(ThemeMode.LIGHT);
    } else {
      document.documentElement.classList.remove(ThemeMode.DARK);
      document.documentElement.classList.add(ThemeMode.LIGHT);
    }
  },
    
  stop: () => {
    const { agentChat } = get();
    if (agentChat?.stop) {
      agentChat.stop();
    }
  },
    
  clearHistory: () => {
    const { agentChat } = get();
    if (agentChat?.clearHistory) {
      agentChat.clearHistory();
    }
  },
}));

// Selectors
export const useTitle = () => useChatStore((state) => state.title);
export const useSuggestions = () => useChatStore((state) => state.suggestions);
export const useSetAgentChat = () => useChatStore((state) => state.setAgentChat);
export const useTheme = () => useChatStore((state) => state.theme);
export const useShowDebug = () => useChatStore((state) => state.showDebug);
export const useMessages = () => useChatStore((state) => state.agentChat?.messages ?? []);
export const useInput = () => useChatStore((state) => state.agentChat?.input ?? '');
export const useIsLoading = () => useChatStore((state) => state.agentChat?.isLoading ?? false);
export const usePendingToolCallConfirmation = () => 
  useChatStore((state) => state.pendingToolCallConfirmation);
export const useSetPendingToolCallConfirmation = () => useChatStore((state) => state.setPendingToolCallConfirmation);
export const useAddToolResult = () => useChatStore((state) => state.agentChat?.addToolResult);