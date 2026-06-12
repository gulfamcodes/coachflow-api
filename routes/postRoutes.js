import express from 'express';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

import {
  createPost,
  getPosts,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, upload.single('image'), createPost)
  .get(protect, getPosts);
router.route('/:id').delete(protect, deletePost);

export default router;
