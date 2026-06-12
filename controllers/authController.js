import User from '../models/User.js';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

// @desc registering a new user
// @routes api/auth/register
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // 1. Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  // 2. Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const user = await User.create({ name, email, password: hashedPassword });

  // 4. Resposne
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};

// @desc logging in a user
// @routes api/auth/login

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, 'Invalid email or password');
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password');
  }

  // 3. Generate token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // 4. Send respons
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};
