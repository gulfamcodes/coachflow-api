import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.route('/').post(protect, createStudent).get(protect, getStudents);
router
  .route('/:id')
  .patch(protect, updateStudent)
  .delete(protect, deleteStudent);

export default router;
