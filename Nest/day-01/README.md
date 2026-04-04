# NestJS API Documentation

This is a NestJS API for managing users and courses with JWT authentication and file upload capabilities.

## Base URL
```
http://localhost:3000
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The server will run on `http://localhost:3000`

---

## 1. Authentication Endpoints (AuthModule)

### POST /auth/signup
Registers a new user and hashes the password.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "username": "janedoe",
  "password": "strongpassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

### POST /auth/login
Authenticates a user and returns a JWT access token.

**Request Body:**
```json
{
  "usernameOrEmail": "janedoe",
  "password": "strongpassword123"
}
```

**Response:**
```json
{
  "access_token": "your-jwt-token-here"
}
```

---

## 2. User Endpoints (UserModule)

### GET /user
Retrieves all users.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Mohammed Sayed",
    "email": "mohammed@example.com",
    "username": "mo_dev",
    "role": "admin"
  }
]
```

---

### GET /user/:id
Retrieves a specific user by ID.

---

### POST /user/upload-avatar/:id
Uploads an avatar for a specific user.

**Form Data:**
- `avatar`: Image file (jpg, jpeg, png, gif)

---

### DELETE /user/:id
Deletes a user. (Protected by AuthGuard)

---

## 3. Course Endpoints (CoursesModule)

### POST /courses
Creates a new course.

**Request Body:**
```json
{
  "title": "Introduction to NestJS",
  "instructor": "Jane Smith",
  "price": 99.99
}
```

---

### GET /courses
Retrieves all courses.

---

### GET /courses/:id
Retrieves a specific course by ID.

---

### PATCH /courses/:id
Updates a course price or instructor.

**Request Body:**
```json
{
  "price": 79.99
}
```

---

### DELETE /courses/:id
Deletes a course.

---

## Data Validation

### User Validation Rules
- `name`: Required string
- `email`: Required valid email
- `username`: Required string, unique
- `password`: Required, minimum 6 characters

### Course Validation Rules
- `title`: Required string
- `instructor`: Required string
- `price`: Required number, minimum 0

## Authentication Security
All protected routes require an `Authorization` header:
`Authorization: Bearer <your-access-token>`
