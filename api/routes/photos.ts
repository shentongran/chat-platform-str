import { Router } from 'express';
import { photos } from '../data/mockData.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(photos);
});

router.post('/', (req, res) => {
  const { url, uploaderId } = req.body;
  
  const newPhoto = {
    id: `photo-${Date.now()}`,
    url,
    uploaderId,
    uploadTime: Date.now(),
    likes: [],
    comments: [],
  };

  photos.unshift(newPhoto);
  res.json(newPhoto);
});

router.post('/:id/like', (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  
  const photo = photos.find(p => p.id === id);
  if (photo) {
    const index = photo.likes.indexOf(userId);
    if (index > -1) {
      photo.likes.splice(index, 1);
    } else {
      photo.likes.push(userId);
    }
    res.json({ likes: photo.likes });
  } else {
    res.status(404).json({ error: 'Photo not found' });
  }
});

export default router;
