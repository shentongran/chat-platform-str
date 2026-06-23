import { Router } from 'express';
import { currentUser } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(currentUser);
});

router.put('/', (req, res) => {
  const { name, signature, mood, avatar } = req.body;
  
  if (name !== undefined) currentUser.name = name;
  if (signature !== undefined) currentUser.signature = signature;
  if (mood !== undefined) currentUser.mood = mood;
  if (avatar !== undefined) currentUser.avatar = avatar;

  res.json(currentUser);
});

export default router;
