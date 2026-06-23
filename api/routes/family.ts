import { Router } from 'express';
import { familyGroup } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(familyGroup);
});

router.get('/members', (_req, res) => {
  res.json(familyGroup.members);
});

export default router;
