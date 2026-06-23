import { Router } from 'express';
import { users } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  const contacts = users.filter(u => u.id !== 'user-0');
  res.json(contacts);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
