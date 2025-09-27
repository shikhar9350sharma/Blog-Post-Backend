import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createBlog } from '../controllers/blog.controller.js';
import { getUserBlogs, deleteBlog, updateBlog } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/create', protectRoute, createBlog);
router.get('/user', protectRoute, getUserBlogs);       // ✅ Get user's blogs
router.delete('/:id', protectRoute, deleteBlog);       // 🗑️ Delete blog
router.put('/:id', protectRoute, updateBlog);          // ✏️ Update blog

export default router;