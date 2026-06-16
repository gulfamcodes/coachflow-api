## Features

- JWT Authentication
- Protected Routes
- Student CRUD Operations
- Post CRUD Operations
- Ownership Protection
- MongoDB Integration
- Password Hashing with bcrypt

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Students

```http
GET    /api/students
POST   /api/students
PATCH  /api/students/:id
DELETE /api/students/:id
```

### Posts

```http
GET    /api/posts
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
```

## Security Features

- JWT Authentication
- Protected Routes
- Resource Ownership Protection
- Password Hashing

## Project Status

CoachFlow API v1 is complete.

### Current Features

- User Authentication
- Student Management
- Post Management
- Authorization & Ownership Checks

### Planned Improvements

- Input Validation
- Automated Testing
- API Documentation
- Deployment

## Author

Gulfam Zafar

GitHub: https://github.com/gulfamcodes
