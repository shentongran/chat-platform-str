export interface User {
  id: string;
  name: string;
  avatar: string;
  signature: string;
  status: 'online' | 'offline';
  mood?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'image' | 'voice' | 'emoji';
  content: string;
  timestamp: number;
  isRead: boolean;
  duration?: number;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  type: 'single' | 'group';
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  members?: User[];
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  type: 'birthday' | 'wedding' | 'memorial' | 'other';
  description?: string;
  cover?: string;
  remind: boolean;
}

export interface Photo {
  id: string;
  url: string;
  uploaderId: string;
  uploadTime: number;
  likes: string[];
  comments?: PhotoComment[];
}

export interface PhotoComment {
  id: string;
  userId: string;
  content: string;
  time: number;
}

export interface FamilyGroup {
  id: string;
  name: string;
  cover: string;
  description: string;
  members: User[];
}
