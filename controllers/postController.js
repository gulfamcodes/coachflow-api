import Post from '../models/Post.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../middleware/asyncHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPost = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!req.file) {
    throw new ApiError(400, 'Image is required');
  }
  const post = await Post.create({
    title,
    image: `/uploads/${req.file.filename}`,
    coach: req.user._id,
  });

  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ coach: req.user._id });
  res.json(posts);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.coach.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized');
  }
  const { title } = req.body;

  if (req.body.title) post.title = req.body.title;

  const updatedPost = await post.save();

  res.status(200).json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.coach.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized');
  }

  const imagePath = path.join(__dirname, '..', post.image);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log('Image delete failed', err.message);
    }
  });

  await post.deleteOne();

  res.status(200).json({
    message: 'Post deleted',
  });
});
