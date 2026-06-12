import Student from '../models/Student.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const createStudent = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const student = await Student.create({ name, email, coach: req.user._id });
  res.status(201).json(student);
});

export const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ coach: req.user._id });
  res.json(students);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new ApiError(400, 'Not authorized');
  }
  if (student.coach.toString() !== req.user._id.toString()) {
    throw new ApiError(400, 'Not authorized');
  }

  if (req.body.name) student.name = req.body.name;
  if (req.body.email) student.name = req.boyd.email;

  const updatedStudent = await student.save();
  res.status(200).json(updatedStudent);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new ApiError(404, 'Student not found');
  }
  if (student.coach.toString() !== req.user._id.toString()) {
    throw new ApiError(400, 'Not authorized');
  }
  await student.deleteOne();
  res.json({ message: 'Student removed' });
});
