# CoachFlow API

Backend API for coaches to manage students and posts with JWT authentication and ownership protection.

## Features

- JWT Authentication
- Protected Routes
- Student CRUD
- Post CRUD
- Ownership Protection
- MongoDB Integration

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## API Endpoints

### Auth

POST /api/auth/register

POST /api/auth/login

### Students

GET /api/students

POST /api/students

PATCH /api/students/:id

DELETE /api/students/:id

### Posts

GET /api/posts

POST /api/posts

PATCH /api/posts/:id

DELETE /api/posts/:id

Posts allow coaches to create and manage learning updates, announcements, or content related to their coaching workflow.

## Project Status

CoachFlow API v1 is complete locally. Deployment is planned next.
