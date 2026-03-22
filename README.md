# VineetKR API

![Deploy Status](https://github.com/contactkrvineet/vineetkr-api/workflows/Deploy%20API/badge.svg)

A RESTful API built with **Node.js**, **Express**, and **MongoDB Atlas** for managing user data. This project demonstrates modern API development practices with proper validation, error handling, and cloud deployment.

**Live API:** https://api.vineetkr.com

---

## 📚 Table of Contents

- [Technology Stack](#technology-stack)
- [What is Express.js?](#what-is-expressjs)
- [Project Features](#project-features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

---

## 🛠️ Technology Stack

### **Backend Framework Details**

- **[Node.js](https://nodejs.org/)** (v18+) - JavaScript runtime
- **[Express.js](https://expressjs.com/)** (v4.18.2) - Web framework for Node.js

### **Database**

- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Cloud NoSQL database
- **[Mongoose](https://mongoosejs.com/)** (v8.0.3) - MongoDB ODM (Object Data Modeling)

### **Validation & Security**

- **[Zod](https://zod.dev/)** (v3.22.4) - TypeScript-first schema validation
- **[CORS](https://www.npmjs.com/package/cors)** (v2.8.5) - Cross-Origin Resource Sharing
- **[dotenv](https://www.npmjs.com/package/dotenv)** (v16.3.1) - Environment variable management

### **Development Tools**

- **[Nodemon](https://nodemon.io/)** (v3.0.2) - Auto-restart on file changes
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

### **Deployment**

- **[Vercel](https://vercel.com/)** - Serverless deployment platform

---

## 🚀 What is Express.js?

**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's the de facto standard server framework for Node.js.

### **Why Express.js?**

1. **Fast & Lightweight** - Minimal overhead with high performance
2. **Easy to Learn** - Simple, intuitive API design
3. **Middleware Support** - Extensible through middleware functions
4. **Robust Routing** - Powerful routing mechanism for handling HTTP requests
5. **Large Ecosystem** - Thousands of npm packages compatible with Express

### **How Express Creates APIs**

Express makes API development simple through:

```javascript
// 1. Import Express
import express from "express";
const app = express();

// 2. Define Routes (API Endpoints)
app.get("/api/users", (req, res) => {
  res.json({ message: "Get all users" });
});

app.post("/api/users", (req, res) => {
  res.json({ message: "Create user" });
});

// 3. Start Server
app.listen(3000, () => {
  console.log("API running on port 3000");
});
```

**Key Concepts:**

- **Routes** - URL paths that handle specific HTTP methods (GET, POST, PUT, DELETE)
- **Middleware** - Functions that process requests before reaching route handlers
- **Request/Response** - Objects containing HTTP request data and methods to send responses
- **JSON Support** - Built-in parsing and sending of JSON data

---

## ✨ Project Features

This API demonstrates:

✅ **RESTful API Design** - Follows REST principles for resource management  
✅ **CRUD Operations** - Create, Read, Update operations for user data  
✅ **Input Validation** - Schema validation using Zod  
✅ **Error Handling** - Centralized error handling middleware  
✅ **MongoDB Integration** - Cloud database with Mongoose ODM  
✅ **Environment Configuration** - Secure secret management  
✅ **CORS Support** - Cross-origin requests enabled  
✅ **Serverless Deployment** - Auto-scaling on Vercel  
✅ **CI/CD Pipeline** - Automated deployment with GitHub Actions  
✅ **Production Ready** - Optimized for serverless environments

---

## 📁 Project Structure

```
vineetkr-api/
├── src/
│   ├── server.js              # Express app setup & entry point
│   ├── config/
│   │   └── database.js        # MongoDB connection config
│   ├── controllers/
│   │   └── userController.js  # Business logic for user operations
│   ├── models/
│   │   └── User.js            # Mongoose schema & model
│   ├── routes/
│   │   └── userRoutes.js      # API route definitions
│   └── validators/
│       └── userValidator.js   # Zod validation schemas
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
├── .env                       # Local environment variables (gitignored)
├── .env.example               # Template for environment variables
├── .gitignore                 # Git ignore rules
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

### **Architecture Flow**

```
Request → Express Middleware → Router → Controller → Model → Database
                                                              ↓
Response ← JSON Response ← Controller ← Model ← Database Query
```

---

## 🔌 API Endpoints

**Base URL:** `https://api.vineetkr.com`

### **Get All Users**

```http
GET /api/users
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Vineet Kumar",
      "email": "vineet@vineetkr.com",
      "age": 25,
      "createdAt": "2025-12-25T10:30:00.000Z",
      "updatedAt": "2025-12-25T10:30:00.000Z"
    }
  ]
}
```

### **Get Single User**

```http
GET /api/users?id=507f1f77bcf86cd799439011
```

### **Create User**

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

### **Update User**

```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 32
}
```

---

## 🏁 Getting Started

### **Prerequisites**

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB Atlas Account** ([Sign up](https://www.mongodb.com/cloud/atlas/register))
- **Git** ([Download](https://git-scm.com/))

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/contactkrvineet/vineetkr-api.git
cd vineetkr-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your credentials
nano .env
```

4. **Configure MongoDB Atlas**

   a. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

   b. Get your connection string:

   - Click **Connect** → **Connect your application**
   - Copy the connection string

   c. Update Network Access:

   - Go to **Network Access** → **Add IP Address**
   - Allow access from anywhere: `0.0.0.0/0` (for development)

5. **Update .env file**

```env
PORT=3000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/your_database
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### **Running the Application**

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The API will be running at: **http://localhost:3000**

### **Testing the API**

**Using cURL:**

```bash
# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "age": 25}'
```

**Using Browser:**
Open http://localhost:3000 to see the welcome message

**Using Postman:**

1. Import the API endpoints
2. Set base URL to `http://localhost:3000`
3. Test GET, POST, PUT operations

---

## 🔐 Environment Variables

### **Required Variables**

| Variable          | Description                            | Example                                          |
| ----------------- | -------------------------------------- | ------------------------------------------------ |
| `PORT`            | Server port number                     | `3000`                                           |
| `MONGODB_URI`     | MongoDB connection string              | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `NODE_ENV`        | Environment mode                       | `development` or `production`                    |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `https://vineetkr.com,http://localhost:3000`     |

### **Local Development**

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### **Production (Vercel)**

Set environment variables in Vercel dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable with production values
3. Redeploy the application

---

## 🚢 Deployment

### **Deploy to Vercel**

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel --prod
```

4. **Set Environment Variables**
   - Go to Vercel dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add all required variables
   - Redeploy

### **Automatic Deployment (GitHub Actions)**

This project includes a GitHub Actions workflow that automatically deploys to Vercel on every push to `main` or `prac` branch.

**Setup:**

1. Add secrets to GitHub repository:

   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - Found in `.vercel/project.json`
   - `VERCEL_PROJECT_ID` - Found in `.vercel/project.json`

2. Push to `main` or `prac` branch - deployment happens automatically!

---

## 🔒 Security

### **Best Practices Implemented**

✅ **Environment Variables** - Secrets stored securely, never in code  
✅ **Input Validation** - All inputs validated with Zod schemas  
✅ **CORS Configuration** - Controlled cross-origin access  
✅ **Error Handling** - No sensitive data leaked in error responses  
✅ **MongoDB Atlas** - Database hosted securely in the cloud  
✅ **.gitignore** - Sensitive files excluded from version control

### **Security Checklist**

- [ ] MongoDB Atlas Network Access configured
- [ ] Strong database password used
- [ ] Environment variables set in hosting platform
- [ ] CORS origins restricted in production
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] `.env` file never committed to git

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Vineet Kumar**

- Website: [vineetkr.com](https://vineetkr.com)
- GitHub: [@contactkrvineet](https://github.com/contactkrvineet)

---

## 📞 Support

For issues or questions:

- Open an [Issue](https://github.com/contactkrvineet/vineetkr-api/issues)
- Email: contactkrvineet,vineet@vineetkr.com

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Zod Documentation](https://zod.dev/)
- [REST API Design Best Practices](https://restfulapi.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Happy Coding! 🚀**
