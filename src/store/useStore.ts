import { create } from 'zustand';
import { User, Message, Poll, ScheduleItem } from '../types';
import WebApp from '@twa-dev/sdk';

interface State {
  user: User | null;
  users: User[];
  messages: Message[];
  polls: Poll[];
  schedule: ScheduleItem[];
  setUser: (user: User) => void;
  addMessage: (message: Message) => void;
  addLike: (messageId: number) => void;
  completePoll: (pollId: number) => void;
  incrementClickCount: () => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  users: [],
  messages: [],
  polls: [],
  schedule: [],
  
  setUser: (user) => set({ user }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  addLike: (messageId) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    )
  })),
  
  completePoll: (pollId) => set((state) => {
    if (!state.user) return state;
    
    const poll = state.polls.find(p => p.id === pollId);
    if (!poll || poll.completedBy.includes(state.user.id)) return state;
    
    return {
      polls: state.polls.map(p =>
        p.id === pollId
          ? { ...p, completedBy: [...p.completedBy, state.user.id] }
          : p
      ),
      user: {
        ...state.user,
        coins: state.user.coins + (poll?.coins || 0)
      }
    };
  }),
  
  incrementClickCount: () => set((state) => {
    if (!state.user) return state;
    
    const newClickCount = state.user.clickCount + 1;
    const coinsToAdd = newClickCount % 10 === 0 ? 5 : 0;
    
    return {
      user: {
        ...state.user,
        clickCount: newClickCount,
        coins: state.user.coins + coinsToAdd
      }
    };
  })
}));