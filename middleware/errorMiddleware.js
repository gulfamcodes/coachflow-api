import ApiError from '../utils/ApiError.js';
export const notfound = (req, res, next) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
