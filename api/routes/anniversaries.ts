import { Router } from 'express';
import { anniversaries } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(anniversaries);
});

router.post('/', (req, res) => {
  const { title, date, type, description, cover, remind } = req.body;
  
  const newAnniversary = {
    id: `ann-${Date.now()}`,
    title,
    date,
    type,
    description: description || '',
    cover: cover || '',
    remind: remind ?? true,
  };

  anniversaries.push(newAnniversary);
  res.json(newAnniversary);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = anniversaries.findIndex(a => a.id === id);
  if (index > -1) {
    anniversaries.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Anniversary not found' });
  }
});

export default router;
