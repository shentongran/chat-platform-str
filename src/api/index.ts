import type { User, Conversation, Message, Anniversary, Photo, FamilyGroup } from '../../shared/types';

const API_BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  getConversations: () => request<Conversation[]>('/messages'),
  getMessages: (id: string) => request<Message[]>(`/messages/${id}`),
  sendMessage: (data: { conversationId: string; senderId: string; type: Message['type']; content: string; duration?: number }) =>
    request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getContacts: () => request<User[]>('/contacts'),
  getContact: (id: string) => request<User>(`/contacts/${id}`),

  getFamily: () => request<FamilyGroup>('/family'),
  getFamilyMembers: () => request<User[]>('/family/members'),

  getPhotos: () => request<Photo[]>('/photos'),
  uploadPhoto: (data: { url: string; uploaderId: string }) =>
    request<Photo>('/photos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  likePhoto: (photoId: string, userId: string) =>
    request<{ likes: string[] }>(`/photos/${photoId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  getAnniversaries: () => request<Anniversary[]>('/anniversaries'),
  addAnniversary: (data: Omit<Anniversary, 'id'>) =>
    request<Anniversary>('/anniversaries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteAnniversary: (id: string) =>
    request<{ success: boolean }>(`/anniversaries/${id}`, {
      method: 'DELETE',
    }),

  getUser: () => request<User>('/user'),
  updateUser: (data: Partial<User>) =>
    request<User>('/user', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
