import { Router } from 'express';
import { conversations, messages } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(conversations);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const conversationMessages = messages[id] || [];
  res.json(conversationMessages);
});

router.post('/', (req, res) => {
  const { conversationId, senderId, type, content, duration } = req.body;
  
  const newMessage = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId,
    type,
    content,
    timestamp: Date.now(),
    isRead: false,
    duration: duration || undefined,
  };

  if (!messages[conversationId]) {
    messages[conversationId] = [];
  }
  messages[conversationId].push(newMessage);

  const conversation = conversations.find(c => c.id === conversationId);
  if (conversation) {
    conversation.lastMessage = type === 'text' ? content : type === 'image' ? '[图片]' : type === 'voice' ? '[语音]' : '[表情]';
    conversation.lastMessageTime = Date.now();
  }

  res.json(newMessage);
});

export default router;
