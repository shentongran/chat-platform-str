import { create } from 'zustand';
import type { User, Conversation, Message, Anniversary, Photo, FamilyGroup } from '@shared/types';
import { api } from '../api';

interface AppState {
  currentUser: User | null;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  anniversaries: Anniversary[];
  photos: Photo[];
  familyGroup: FamilyGroup | null;
  darkMode: boolean;
  loading: boolean;

  fetchCurrentUser: () => Promise<void>;
  fetchConversations: () => Promise<void>;
  fetchMessages: (id: string) => Promise<void>;
  setCurrentConversation: (conv: Conversation | null) => void;
  sendMessage: (data: { conversationId: string; senderId: string; type: Message['type']; content: string; duration?: number }) => Promise<void>;
  fetchAnniversaries: () => Promise<void>;
  addAnniversary: (data: Omit<Anniversary, 'id'>) => Promise<void>;
  deleteAnniversary: (id: string) => Promise<void>;
  fetchPhotos: () => Promise<void>;
  likePhoto: (photoId: string, userId: string) => Promise<void>;
  fetchFamily: () => Promise<void>;
  toggleDarkMode: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  conversations: [],
  currentConversation: null,
  messages: [],
  anniversaries: [],
  photos: [],
  familyGroup: null,
  darkMode: false,
  loading: false,

  fetchCurrentUser: async () => {
    try {
      const user = await api.getUser();
      set({ currentUser: user });
    } catch (e) {
      console.error('Failed to fetch user:', e);
    }
  },

  fetchConversations: async () => {
    try {
      const convs = await api.getConversations();
      set({ conversations: convs });
    } catch (e) {
      console.error('Failed to fetch conversations:', e);
    }
  },

  fetchMessages: async (id: string) => {
    try {
      const msgs = await api.getMessages(id);
      set({ messages: msgs });
    } catch (e) {
      console.error('Failed to fetch messages:', e);
    }
  },

  setCurrentConversation: (conv) => set({ currentConversation: conv }),

  sendMessage: async (data) => {
    try {
      const newMsg = await api.sendMessage(data);
      const currentMsgs = get().messages;
      set({ messages: [...currentMsgs, newMsg] });
      
      const convs = get().conversations;
      const updatedConvs = convs.map(c => {
        if (c.id === data.conversationId) {
          return {
            ...c,
            lastMessage: data.type === 'text' ? data.content : data.type === 'image' ? '[图片]' : data.type === 'voice' ? '[语音]' : '[表情]',
            lastMessageTime: Date.now(),
          };
        }
        return c;
      });
      set({ conversations: updatedConvs });
    } catch (e) {
      console.error('Failed to send message:', e);
    }
  },

  fetchAnniversaries: async () => {
    try {
      const anns = await api.getAnniversaries();
      set({ anniversaries: anns });
    } catch (e) {
      console.error('Failed to fetch anniversaries:', e);
    }
  },

  addAnniversary: async (data) => {
    try {
      const newAnn = await api.addAnniversary(data);
      set({ anniversaries: [...get().anniversaries, newAnn] });
    } catch (e) {
      console.error('Failed to add anniversary:', e);
    }
  },

  deleteAnniversary: async (id) => {
    try {
      await api.deleteAnniversary(id);
      set({ anniversaries: get().anniversaries.filter(a => a.id !== id) });
    } catch (e) {
      console.error('Failed to delete anniversary:', e);
    }
  },

  fetchPhotos: async () => {
    try {
      const photos = await api.getPhotos();
      set({ photos });
    } catch (e) {
      console.error('Failed to fetch photos:', e);
    }
  },

  likePhoto: async (photoId, userId) => {
    try {
      const result = await api.likePhoto(photoId, userId);
      const photos = get().photos;
      const updated = photos.map(p => p.id === photoId ? { ...p, likes: result.likes } : p);
      set({ photos: updated });
    } catch (e) {
      console.error('Failed to like photo:', e);
    }
  },

  fetchFamily: async () => {
    try {
      const family = await api.getFamily();
      set({ familyGroup: family });
    } catch (e) {
      console.error('Failed to fetch family:', e);
    }
  },

  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    set({ darkMode: newDarkMode });
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  updateUser: async (data) => {
    try {
      const user = await api.updateUser(data);
      set({ currentUser: user });
    } catch (e) {
      console.error('Failed to update user:', e);
    }
  },
}));
