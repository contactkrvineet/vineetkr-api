# Framework Structure Guide

## Table of Contents
- [Express.js Framework Overview](#expressjs-framework-overview)
- [MVC Architecture Pattern](#mvc-architecture-pattern)
- [Project Architecture](#project-architecture)
- [Request-Response Lifecycle](#request-response-lifecycle)
- [Middleware Pipeline](#middleware-pipeline)
- [Routing System](#routing-system)
- [Database Layer](#database-layer)
- [Validation Layer](#validation-layer)
- [Error Handling](#error-handling)
- [Serverless Adaptation](#serverless-adaptation)

---

## Express.js Framework Overview

### What is Express.js?

Express.js is a **minimal**, **flexible**, and **fast** Node.js web application framework that provides a robust set of features for web and mobile applications.

### Core Concepts

```javascript
// 1. Application Instance
const app = express();

// 2. Middleware Functions
app.use(middleware);

// 3. Route Handlers
app.get('/path', handler);

// 4. Listen to Port
app.listen(port);
```

### Why Express?

| Feature | Benefit |
|---------|---------|
| **Minimal** | Small footprint, fast performance |
| **Unopinionated** | Freedom to structure your app as you want |
| **Middleware** | Composable request processing pipeline |
| **Routing** | Powerful URL pattern matching |
| **HTTP Utilities** | Easy request/response handling |
| **Template Engines** | Support for various view engines |
| **Large Ecosystem** | Thousands of compatible packages |

---

## MVC Architecture Pattern

This project follows the **Model-View-Controller (MVC)** pattern:

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│                   (Browser/Mobile App)                   │
└───────────────────────┬──────────────────────────────────┘
                        │ HTTP Request
                        ↓
┌─────────────────────────────────────────────────────────┐
│                     EXPRESS SERVER                       │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌────────────┐  │
│  │   ROUTES    │ →  │ CONTROLLER  │ →  │   MODEL    │  │
│  │ (Endpoints) │    │  (Logic)    │    │ (Database) │  │
│  └─────────────┘    └─────────────┘    └────────────┘  │
│         ↑                   ↓                   ↓        │
│         │                   │                   │        │
│  ┌─────────────┐    ┌─────────────┐    ┌────────────┐  │
│  │ MIDDLEWARE  │    │ VALIDATORS  │    │  MONGOOSE  │  │
│  └─────────────┘    └─────────────┘    └────────────┘  │
│                                                          │
└───────────────────────┬──────────────────────────────────┘
                        │ HTTP Response (JSON)
                        ↓
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                            │
└─────────────────────────────────────────────────────────┘
```

### Components Breakdown

#### **Model (M)** - `src/models/`
- Defines data structure and schema
- Handles database operations
- Business rules and validation
- **Technology:** Mongoose ODM

```javascript
// User.js - Defines what a "User" looks like
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

#### **Controller (C)** - `src/controllers/`
- Handles business logic
- Processes requests
- Interacts with models
- Sends responses

```javascript
// userController.js - What to do when user requests data
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
};
```

#### **Routes (R)** - `src/routes/`
- Maps URLs to controllers
- Defines HTTP methods
- Groups related endpoints

```javascript
// userRoutes.js - Which URL calls which controller
router.get('/', getUsers);
router.post('/', createUser);
```

#### **View (V)** - Not Applicable
- This is a **REST API**, not a web app
- Returns **JSON** instead of HTML
- Frontend (View) is separate

---

## Project Architecture

### Directory Structure Explained

```
vineetkr-api/
│
├── src/                          # Source code
│   │
│   ├── server.js                 # 🚀 Entry Point - App initialization
│   │   ├── Import dependencies
│   │   ├── Setup middleware
│   │   ├── Register routes
│   │   ├── Error handling
│   │   └── Export app for Vercel
│   │
│   ├── config/                   # ⚙️ Configuration
│   │   └── database.js           # MongoDB connection logic
│   │       ├── Connection pooling
│   │       ├── Serverless optimization
│   │       └── Error handling
│   │
│   ├── models/                   # 📦 Data Models (Database Schema)
│   │   └── User.js               # User schema definition
│   │       ├── Define fields (name, email, age)
│   │       ├── Data types
│   │       ├── Validation rules
│   │       └── Timestamps
│   │
│   ├── controllers/              # 🎮 Business Logic
│   │   └── userController.js    # User-related operations
│   │       ├── getUsers()        # Fetch all/single user
│   │       ├── createUser()      # Create new user
│   │       └── updateUser()      # Update existing user
│   │
│   ├── routes/                   # 🛣️ API Routes (URL Mapping)
│   │   └── userRoutes.js         # User endpoints
│   │       ├── GET /api/users
│   │       ├── POST /api/users
│   │       └── PUT /api/users/:id
│   │
│   └── validators/               # ✅ Input Validation
│       └── userValidator.js      # Zod schemas
│           ├── createUserSchema  # Validate POST data
│           └── updateUserSchema  # Validate PUT data
│
├── .github/                      # 🔄 CI/CD
│   └── workflows/
│       └── deploy.yml            # GitHub Actions pipeline
│
├── vercel.json                   # 🚢 Vercel deployment config
├── package.json                  # 📦 Dependencies & scripts
├── .env                          # 🔐 Environment variables (local)
└── .env.example                  # 📝 Template for .env
```

---

## Request-Response Lifecycle

### Complete Flow of a User Request

```
┌───────────────────────────────────────────────────────────────┐
│ 1. CLIENT SENDS REQUEST                                       │
│    POST /api/users                                            │
│    Body: { "name": "John", "email": "john@ex.com", "age": 25 }│
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 2. EXPRESS SERVER RECEIVES REQUEST                            │
│    ├── Server.js catches the request                          │
│    └── Routes it through middleware stack                     │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 3. MIDDLEWARE PROCESSING                                       │
│    ├── CORS: Check origin                                     │
│    ├── express.json(): Parse JSON body                        │
│    └── Pass to next middleware                                │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 4. ROUTING                                                     │
│    ├── Match URL: /api/users                                  │
│    ├── Match Method: POST                                     │
│    └── Forward to: userRoutes                                 │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 5. ROUTE HANDLER                                               │
│    ├── userRoutes.js                                          │
│    ├── router.post('/', createUser)                           │
│    └── Call createUser controller                             │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 6. VALIDATION                                                  │
│    ├── userValidator.createUserSchema                         │
│    ├── Validate: name (required, string)                      │
│    ├── Validate: email (required, valid email)                │
│    ├── Validate: age (optional, number)                       │
│    └── Pass if valid, reject if invalid                       │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 7. CONTROLLER LOGIC                                            │
│    ├── userController.createUser()                            │
│    ├── Check if email already exists                          │
│    └── If not, proceed to create user                         │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 8. DATABASE OPERATION                                          │
│    ├── User.create() - Mongoose method                        │
│    ├── Connect to MongoDB Atlas                               │
│    ├── Insert document into 'users' collection                │
│    └── Return created user object                             │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 9. RESPONSE FORMATTING                                         │
│    ├── Controller receives DB result                          │
│    ├── Format as JSON response                                │
│    └── Set status code: 201 (Created)                         │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────────┐
│ 10. SEND RESPONSE TO CLIENT                                    │
│     {                                                          │
│       "success": true,                                         │
│       "message": "User created successfully",                 │
│       "data": {                                                │
│         "_id": "507f...",                                      │
│         "name": "John",                                        │
│         "email": "john@ex.com",                                │
│         "age": 25                                              │
│       }                                                        │
│     }                                                          │
└───────────────────────────────────────────────────────────────┘
```

---

## Middleware Pipeline

### What is Middleware?

Middleware functions are functions that have access to:
- **Request object** (`req`)
- **Response object** (`res`)
- **Next middleware function** (`next`)

### Middleware Stack in This Project

```javascript
// server.js - Middleware execution order

1. CORS Middleware
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
     credentials: true
   }));
   // ✓ Allows cross-origin requests from specified domains

2. JSON Body Parser
   app.use(express.json());
   // ✓ Parses incoming JSON payloads into req.body

3. URL-Encoded Parser
   app.use(express.urlencoded({ extended: true }));
   // ✓ Parses URL-encoded data (form submissions)

4. Route Handlers
   app.use('/api/users', userRoutes);
   // ✓ Routes requests to appropriate controllers

5. Error Handler
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(err.status || 500).json({
       success: false,
       message: err.message || 'Internal Server Error'
     });
   });
   // ✓ Catches and handles all errors
```

### Middleware Flow Diagram

```
Request
   │
   ├──→ CORS Middleware
   │       │ (Check origin)
   │       ↓
   ├──→ express.json()
   │       │ (Parse JSON body)
   │       ↓
   ├──→ express.urlencoded()
   │       │ (Parse form data)
   │       ↓
   ├──→ Route Middleware
   │       │ (Match /api/users)
   │       ↓
   ├──→ Controller Function
   │       │ (Business logic)
   │       ↓
   ├──→ Send Response
   │
   └──→ Error Handler (if error occurs)
          │
          ↓
       Send Error Response
```

---

## Routing System

### How Express Routing Works

```javascript
// Basic route structure
app.METHOD(PATH, HANDLER)

// Where:
// METHOD = HTTP method (get, post, put, delete)
// PATH = URL pattern (/api/users, /api/users/:id)
// HANDLER = Callback function to execute
```

### Route Organization

#### **1. Main Server Routes** (`server.js`)
```javascript
// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to API' });
});

// User routes
app.use('/api/users', userRoutes);
```

#### **2. User Routes** (`src/routes/userRoutes.js`)
```javascript
import { Router } from 'express';
const router = Router();

// GET /api/users - Get all users
router.get('/', getUsers);

// POST /api/users - Create user
router.post('/', createUser);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

export default router;
```

### Route Parameters

```javascript
// URL: /api/users/507f1f77bcf86cd799439011
router.put('/:id', updateUser);

// In controller:
const { id } = req.params; // "507f1f77bcf86cd799439011"
```

### Query Parameters

```javascript
// URL: /api/users?id=507f1f77bcf86cd799439011
router.get('/', getUsers);

// In controller:
const { id } = req.query; // "507f1f77bcf86cd799439011"
```

---

## Database Layer

### Mongoose ODM (Object Data Modeling)

Mongoose provides:
- **Schema definition** - Structure your data
- **Validation** - Ensure data integrity
- **Query building** - Simplified database queries
- **Middleware** - Pre/post hooks
- **Population** - Relational data

### User Model Structure

```javascript
// models/User.js

import mongoose from 'mongoose';

// 1. Define Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true  // Adds createdAt, updatedAt
});

// 2. Create Model
export const User = mongoose.model('User', userSchema);

// 3. Use in Controllers
const users = await User.find();           // Get all
const user = await User.findById(id);      // Get one
const newUser = await User.create(data);   // Create
const updated = await User.findByIdAndUpdate(id, data); // Update
```

### Database Connection

```javascript
// config/database.js

let isConnected = false;

export const connectDB = async () => {
  // Serverless optimization: reuse connection
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
```

---

## Validation Layer

### Zod Schema Validation

**Why Zod?**
- TypeScript-first
- Runtime validation
- Type inference
- Better error messages
- No dependencies

### Validation Schemas

```javascript
// validators/userValidator.js

import { z } from 'zod';

// Create User Schema
export const createUserSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Invalid email format'),
  
  age: z.number()
    .int('Age must be an integer')
    .min(0, 'Age cannot be negative')
    .max(150, 'Age seems unrealistic')
    .optional()
});

// Update User Schema (all fields optional)
export const updateUserSchema = createUserSchema.partial();
```

### Using Validation in Controllers

```javascript
// controllers/userController.js

export const createUser = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = createUserSchema.parse(req.body);
    
    // If valid, proceed with creation
    const user = await User.create(validatedData);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    }
    next(error);
  }
};
```

---

## Error Handling

### Error Handling Strategy

```javascript
// Global error handler in server.js

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});
```

### Error Types Handled

1. **Validation Errors** (400)
   - Zod validation failures
   - Missing required fields

2. **Not Found Errors** (404)
   - Resource doesn't exist
   - Invalid IDs

3. **Duplicate Errors** (400)
   - Email already exists
   - Unique constraint violations

4. **Database Errors** (500)
   - Connection failures
   - Query errors

5. **Server Errors** (500)
   - Unexpected errors
   - Runtime exceptions

---

## Serverless Adaptation

### Traditional vs Serverless

#### **Traditional Server**
```javascript
// Runs continuously
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### **Serverless (Vercel)**
```javascript
// Exports app, runs on-demand
export default app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000);
}
```

### Serverless Optimizations

1. **Connection Pooling**
```javascript
let isConnected = false;

export const connectDB = async () => {
  // Reuse existing connection
  if (isConnected) return;
  
  await mongoose.connect(mongoURI);
  isConnected = true;
};
```

2. **No Long-Running Processes**
   - Each request is independent
   - Stateless functions
   - Fast cold starts

3. **Environment Variables**
   - Set in Vercel dashboard
   - Injected at runtime
   - No .env file needed

### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

---

## Summary

### Framework Architecture Benefits

✅ **Separation of Concerns** - Each layer has a specific responsibility  
✅ **Maintainability** - Easy to update and debug  
✅ **Scalability** - Can handle growing traffic  
✅ **Testability** - Each component can be tested independently  
✅ **Reusability** - Components can be reused across projects  
✅ **Security** - Validation and error handling built-in  

### Key Takeaways

1. **Express.js** provides the web server framework
2. **MVC pattern** organizes code logically
3. **Middleware** processes requests in a pipeline
4. **Mongoose** handles database operations
5. **Zod** validates incoming data
6. **Serverless** deployment on Vercel for auto-scaling

---

**This architecture is production-ready, scalable, and follows industry best practices!** 🚀
