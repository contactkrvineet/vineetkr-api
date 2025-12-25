# VineetKR API

Professional REST API for vineetkr.com built with modern JavaScript stack.

## 📖 Project Overview

This is a complete REST API implementation featuring:

- ✅ **GET** endpoint - Retrieve users
- ✅ **POST** endpoint - Create new users
- ✅ **PUT** endpoint - Update existing users
- Full input validation with Zod
- MongoDB database integration
- Error handling and CORS support
- Clean MVC architecture

## 🚀 Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4.x
- **Language**: JavaScript (ES6+ with ES Modules)
- **Database**: MongoDB 6.x
- **ODM**: Mongoose 8.x
- **Validation**: Zod 3.x
- **Dev Tools**: nodemon
- **Other**: dotenv, cors

## 🏗️ Architecture & Framework Structure

### Architecture Pattern: MVC (Model-View-Controller)

This project follows the **MVC architectural pattern** adapted for REST APIs:

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT REQUEST                          │
│                    (Browser, Postman, cURL)                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER                             │
│                      (src/server.js)                            │
├─────────────────────────────────────────────────────────────────┤
│  1. Middleware Layer                                            │
│     ├── CORS (Cross-Origin Resource Sharing)                    │
│     ├── JSON Parser (body parsing)                              │
│     └── URL Encoded Parser                                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTER LAYER                               │
│                  (src/routes/userRoutes.js)                     │
├─────────────────────────────────────────────────────────────────┤
│  2. Route Mapping                                               │
│     GET    /api/users      → getUsers()                         │
│     POST   /api/users      → createUser()                       │
│     PUT    /api/users/:id  → updateUser()                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                             │
│              (src/controllers/userController.js)                │
├─────────────────────────────────────────────────────────────────┤
│  3. Business Logic                                              │
│     ├── Request Validation (Zod schemas)                        │
│     ├── Data Processing                                         │
│     ├── Error Handling                                          │
│     └── Response Formatting                                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MODEL LAYER                                │
│                   (src/models/User.js)                          │
├─────────────────────────────────────────────────────────────────┤
│  4. Data Schema & Database Operations                           │
│     ├── Schema Definition (Mongoose)                            │
│     ├── Field Validation Rules                                  │
│     ├── CRUD Operations (Create, Read, Update, Delete)          │
│     └── Database Queries                                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                               │
│                  (src/config/database.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  5. MongoDB Connection                                          │
│     ├── Connection Management                                   │
│     ├── Error Handling                                          │
│     └── Event Listeners                                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │   MongoDB     │
                  │   Database    │
                  └───────────────┘
```

### Request Flow Example: Creating a User

```
1. CLIENT sends POST request
   ↓
   POST http://localhost:3000/api/users
   Body: {"name": "Vineet", "email": "vineet@vineetkr.com", "age": 25}

2. EXPRESS SERVER receives request
   ↓
   - CORS middleware: Allows cross-origin requests
   - JSON Parser: Parses request body into JavaScript object

3. ROUTER matches route
   ↓
   POST /api/users → calls createUser() controller

4. CONTROLLER processes request
   ↓
   - Validates data with Zod schema (src/validators/userValidator.js)
   - Checks if email already exists
   - Calls User model to create new user
   - Formats response with success message

5. MODEL interacts with database
   ↓
   - User.create() → Mongoose saves document to MongoDB
   - Returns created user object with _id, timestamps

6. DATABASE stores data
   ↓
   - MongoDB persists user document
   - Generates unique _id
   - Adds createdAt and updatedAt timestamps

7. RESPONSE flows back to client
   ↓
   {
     "success": true,
     "message": "User created successfully",
     "data": {
       "_id": "676c5a12...",
       "name": "Vineet",
       "email": "vineet@vineetkr.com",
       "age": 25,
       "createdAt": "2025-12-25T10:30:00.000Z",
       "updatedAt": "2025-12-25T10:30:00.000Z"
     }
   }
```

### Component Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    APPLICATION ARCHITECTURE                     │
└────────────────────────────────────────────────────────────────┘

┌─────────────────┐      ┌─────────────────┐      ┌─────────────┐
│   Validators    │      │   Controllers   │      │   Models    │
│   (Zod)         │─────▶│   (Business)    │─────▶│  (Mongoose) │
└─────────────────┘      └─────────────────┘      └─────────────┘
        │                         │                        │
        │                         │                        │
        ▼                         ▼                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    src/validators/                              │
│  • createUserSchema  → Validates POST data                      │
│  • updateUserSchema  → Validates PUT data                       │
│  • Uses Zod for type-safe validation                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    src/controllers/                             │
│  • getUsers()    → Fetches all/single user                      │
│  • createUser()  → Creates new user                             │
│  • updateUser()  → Updates existing user                        │
│  • Handles errors and response formatting                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    src/models/                                  │
│  • User Schema   → Defines data structure                       │
│  • Field types   → String, Number, Date                         │
│  • Validations   → Required, unique, min/max                    │
│  • Timestamps    → Auto createdAt/updatedAt                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    src/routes/                                  │
│  • Maps HTTP methods to controllers                             │
│  • Defines URL patterns                                         │
│  • Groups related endpoints                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    src/config/                                  │
│  • Database connection configuration                            │
│  • Environment-based settings                                   │
│  • Connection pooling                                           │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW DIAGRAM                          │
└─────────────────────────────────────────────────────────────────┘

REQUEST DATA:
┌──────────┐      ┌────────────┐      ┌──────────┐      ┌─────────┐
│  Client  │─────▶│ Validator  │─────▶│Controller│─────▶│  Model  │
│  (JSON)  │      │   (Zod)    │      │ (Logic)  │      │(Mongoose)│
└──────────┘      └────────────┘      └──────────┘      └─────────┘
                        │                                     │
                        │ Validation Error                    │
                        ▼                                     ▼
                  ┌──────────┐                          ┌─────────┐
                  │  Error   │                          │ MongoDB │
                  │ Response │                          │ Storage │
                  └──────────┘                          └─────────┘

RESPONSE DATA:
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ MongoDB │─────▶│  Model   │─────▶│ Controller │─────▶│  Client  │
│  Data   │      │(Mongoose)│      │ (Format)   │      │  (JSON)  │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
```

### Layered Architecture Breakdown

**Layer 1: Presentation Layer (Entry Point)**

- **File**: `src/server.js`
- **Purpose**: Application bootstrap, middleware setup
- **Responsibilities**:
  - Initialize Express app
  - Configure middleware (CORS, body-parser)
  - Register routes
  - Start HTTP server
  - Error handling

**Layer 2: Routing Layer**

- **File**: `src/routes/userRoutes.js`
- **Purpose**: URL mapping and HTTP method handling
- **Responsibilities**:
  - Define API endpoints
  - Map routes to controllers
  - RESTful URL structure
  - Route-level middleware (if needed)

**Layer 3: Validation Layer**

- **File**: `src/validators/userValidator.js`
- **Purpose**: Input validation and sanitization
- **Responsibilities**:
  - Validate request data types
  - Check required fields
  - Enforce data constraints
  - Provide clear error messages

**Layer 4: Controller Layer (Business Logic)**

- **File**: `src/controllers/userController.js`
- **Purpose**: Request/response handling and business logic
- **Responsibilities**:
  - Parse request data
  - Call validators
  - Execute business rules
  - Interact with models
  - Format responses
  - Handle errors

**Layer 5: Model Layer (Data Layer)**

- **File**: `src/models/User.js`
- **Purpose**: Data structure and database operations
- **Responsibilities**:
  - Define schema structure
  - Set field validations
  - Create database queries
  - Handle data transformations
  - Manage relationships (if any)

**Layer 6: Database Layer**

- **File**: `src/config/database.js`
- **Purpose**: Database connection management
- **Responsibilities**:
  - Establish MongoDB connection
  - Handle connection errors
  - Manage connection lifecycle
  - Configure connection options

### Dependency Flow

```
server.js
  ├── Imports routes/userRoutes.js
  │     └── Imports controllers/userController.js
  │           ├── Imports models/User.js
  │           │     └── Uses mongoose (database.js)
  │           └── Imports validators/userValidator.js
  │                 └── Uses Zod
  └── Imports config/database.js
        └── Uses mongoose
```

### Design Principles Applied

1. **Separation of Concerns**: Each layer has a single, well-defined responsibility
2. **Modularity**: Components are independent and reusable
3. **Scalability**: Easy to add new endpoints, models, and features
4. **Maintainability**: Clear structure makes debugging and updates easier
5. **Testability**: Isolated components can be tested independently
6. **RESTful Design**: Follows REST API conventions and standards

## 🛠️ Initial Setup - Framework Installation

### Step 1: Install Node.js

**macOS:**

```bash
# Using Homebrew
brew install node

# Verify installation
node --version  # Should show v18 or higher
npm --version
```

**Windows:**

- Download from [nodejs.org](https://nodejs.org/)
- Run the installer
- Verify in Command Prompt: `node --version`

**Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Install Docker (Optional - for MongoDB)

**macOS:**

```bash
brew install --cask docker
# Then open Docker Desktop from Applications
```

**Windows:**

- Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Run installer and restart

**Linux:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Step 3: Clone/Download This Project

```bash
cd  PATH/vineetkr-api/vineetkr-api
```

### Step 4: Install Project Dependencies

```bash
npm install
```

This installs:

- Express.js (web framework)
- Mongoose (MongoDB ODM)
- Zod (validation)
- dotenv (environment variables)
- cors (cross-origin resource sharing)
- nodemon (auto-reload during development)

## 💾 Database Setup

You have **3 options** for MongoDB. Choose one:

### Option 1: Docker (Recommended - Easiest)

```bash
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB when done
docker stop mongodb

# Restart MongoDB
docker start mongodb

# Remove MongoDB container
docker rm -f mongodb
```

**Pros:** No installation, easy cleanup, isolated environment  
**Cons:** Requires Docker Desktop

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Sign up:** [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Create a free cluster** (M0 - Free Forever)
3. **Create database user** (username/password)
4. **Whitelist IP:** Add `0.0.0.0/0` (allow from anywhere)
5. **Get connection string:** Click "Connect" → "Connect your application"
6. **Update .env file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vineetkr-db
   ```

**Pros:** Free, cloud-hosted, no local setup  
**Cons:** Requires internet connection

### Option 3: Local MongoDB Installation

**macOS:**

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community
```

**Windows:**

- Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Run installer (choose Complete setup)
- MongoDB runs as Windows Service automatically

**Linux:**

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## ⚙️ Configuration

### Environment Variables

The project uses `.env` file for configuration:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vineetkr-db
NODE_ENV=development
```

**To modify:**

1. Edit `.env` file
2. Change `PORT` if 3000 is already in use
3. Update `MONGODB_URI` if using Atlas or custom setup

## 🏃 Running the API

### Start the Server

**Development mode** (with auto-reload on file changes):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

You should see:

```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:3000
📝 API Documentation: http://localhost:3000/
```

### Access the API

Open your browser or use curl:

- **API Root:** http://localhost:3000/
- **Users Endpoint:** http://localhost:3000/api/users

### Stop the Server

Press `Ctrl + C` in the terminal where the server is running

## 📡 API Endpoints

### 1. GET - Retrieve Users

**Get all users:**

```bash
GET http://localhost:3000/api/users
```

**Get specific user by ID:**

```bash
GET http://localhost:3000/api/users?id=<USER_ID>
```

**Success Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "676c5a1234567890abcdef12",
      "name": "Vineet Kumar",
      "email": "vineet@vineetkr.com",
      "age": 25,
      "createdAt": "2025-12-25T10:30:00.000Z",
      "updatedAt": "2025-12-25T10:30:00.000Z"
    }
  ]
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 2. POST - Create New User

**Endpoint:**

```bash
POST http://localhost:3000/api/users
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Vineet Kumar",
  "email": "vineet@vineetkr.com",
  "age": 25
}
```

**Required Fields:**

- `name` (string, min 2 characters)
- `email` (string, valid email format)

**Optional Fields:**

- `age` (number, must be >= 0)

**Success Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "676c5a1234567890abcdef12",
    "name": "Vineet Kumar",
    "email": "vineet@vineetkr.com",
    "age": 25,
    "createdAt": "2025-12-25T10:30:00.000Z",
    "updatedAt": "2025-12-25T10:30:00.000Z"
  }
}
```

**Validation Error Response (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

**Duplicate Email Error (400):**

```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### 3. PUT - Update User

**Endpoint:**

```bash
PUT http://localhost:3000/api/users/:id
Content-Type: application/json
```

**Request Body (all fields optional):**

```json
{
  "name": "Vineet K",
  "email": "newemail@vineetkr.com",
  "age": 26
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "676c5a1234567890abcdef12",
    "name": "Vineet K",
    "email": "newemail@vineetkr.com",
    "age": 26,
    "createdAt": "2025-12-25T10:30:00.000Z",
    "updatedAt": "2025-12-25T11:45:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "User not found"
}
```

## 🧪 Testing the API

### Using cURL (Command Line)

**1. Create a new user:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Vineet Kumar","email":"vineet@vineetkr.com","age":25}'
```

**2. Get all users:**

```bash
curl http://localhost:3000/api/users
```

**3. Get specific user:**

```bash
curl "http://localhost:3000/api/users?id=676c5a1234567890abcdef12"
```

**4. Update a user (replace <USER_ID> with actual ID):**

```bash
curl -X PUT http://localhost:3000/api/users/<USER_ID> \
  -H "Content-Type: application/json" \
  -d '{"age":26}'
```

### Using Postman

1. **Download:** [postman.com](https://www.postman.com/downloads/)
2. **Import Collection:** Create requests for each endpoint
3. **Set Headers:** `Content-Type: application/json`
4. **Test:** Send requests and view responses

### Using Browser (for GET only)

Simply visit:

- http://localhost:3000/
- http://localhost:3000/api/users

### Using VS Code REST Client Extension

1. Install "REST Client" extension
2. Create `test.http` file:

```http
### Get all users
GET http://localhost:3000/api/users

### Create user
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Vineet Kumar",
  "email": "vineet@vineetkr.com",
  "age": 25
}

### Update user (replace with actual ID)
PUT http://localhost:3000/api/users/676c5a1234567890abcdef12
Content-Type: application/json

{
  "age": 26
}
```

## 📁 Project Structure

```
vineetkr-api/
├── src/
│   ├── config/
│   │   └── database.js           # MongoDB connection configuration
│   │                            # Handles connect, disconnect, error events
│   │
│   ├── controllers/
│   │   └── userController.js    # Business logic for user operations
│   │                            # Contains: getUsers, createUser, updateUser
│   │
│   ├── models/
│   │   └── User.js              # Mongoose schema for User entity
│   │                            # Defines: name, email, age fields
│   │
│   ├── routes/
│   │   └── userRoutes.js        # Express routes for /api/users
│   │                            # Maps HTTP methods to controllers
│   │
│   ├── validators/
│   │   └── userValidator.js     # Zod validation schemas
│   │                            # Validates request data before processing
│   │
│   └── server.js                # Application entry point
│                                # Initializes Express, middleware, routes
│
├── .env                          # Environment variables (not in git)
├── .env.example                  # Template for environment variables
├── .gitignore                    # Files to exclude from git
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Locked dependency versions
└── README.md                     # Project documentation (this file)
```

### File Descriptions

**`src/server.js`**

- Express app initialization
- Middleware setup (CORS, JSON parsing)
- Route registration
- Server startup and error handling

**`src/config/database.js`**

- MongoDB connection using Mongoose
- Connection error handling
- Event listeners for database state

**`src/models/User.js`**

- User schema definition
- Field validation rules
- Automatic timestamps (createdAt, updatedAt)

**`src/routes/userRoutes.js`**

- Defines API endpoints
- Maps HTTP verbs to controller functions
- Modular route organization

**`src/controllers/userController.js`**

- GET: Fetch all users or single user by ID
- POST: Create new user with validation
- PUT: Update existing user by ID
- Error handling and response formatting

**`src/validators/userValidator.js`**

- Zod schemas for input validation
- Type-safe data validation
- Custom error messages

## 🌐 Deployment to Production

### Option 1: Railway (Recommended - Free Tier Available)

1. **Sign up:** [railway.app](https://railway.app/)
2. **Connect GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. **Create New Project** → Select your repository
4. **Add MongoDB:** Click "New" → "Database" → "MongoDB"
5. **Set Environment Variables:**
   - Railway auto-sets `MONGODB_URI`
   - Add `PORT=3000` (or Railway's `$PORT`)
6. **Deploy:** Automatic on git push
7. **Get URL:** Railway provides public URL

### Option 2: Render

1. **Sign up:** [render.com](https://render.com/)
2. **New Web Service** → Connect GitHub repo
3. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Add MongoDB Atlas** connection string to environment variables
5. **Deploy:** Click "Create Web Service"

### Option 3: Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login and create app
heroku login
heroku create vineetkr-api

# Add MongoDB addon (or use Atlas)
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# Open app
heroku open
```

### Option 4: DigitalOcean App Platform

1. **Sign up:** [digitalocean.com](https://www.digitalocean.com/)
2. **Create App** → Import from GitHub
3. **Add MongoDB:**
   - Use DigitalOcean Managed MongoDB, or
   - Use MongoDB Atlas connection string
4. **Configure Environment Variables**
5. **Deploy**

### Production Checklist

- [ ] Use MongoDB Atlas (or production database)
- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add helmet.js for security headers
- [ ] Set up proper CORS origins (not wildcard)
- [ ] Add logging (winston, morgan)
- [ ] Set up monitoring (New Relic, Datadog)
- [ ] Configure custom domain DNS
- [ ] Enable HTTPS (usually automatic on platforms)
- [ ] Add API authentication (JWT, API keys)

## 🌍 Connecting Your Custom Domain (vineetkr.com)

### Overview

To make your API accessible at `https://api.vineetkr.com` or `https://www.vineetkr.com/api`, you need to:
1. Deploy your API to a hosting platform
2. Configure DNS records to point to your deployment
3. Set up SSL certificate (HTTPS)

### Step-by-Step Domain Connection

#### Step 1: Deploy Your API

Choose a platform from the deployment options above. For this example, we'll use **Railway** (easiest):

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial API deployment"

# Push to GitHub
git remote add origin https://github.com/yourusername/vineetkr-api.git
git push -u origin main

# Deploy on Railway
# Visit railway.app and connect your GitHub repo
```

After deployment, Railway will give you a URL like: `https://vineetkr-api-production.up.railway.app`

#### Step 2: Get Your Domain DNS Settings

You need access to your domain registrar where you purchased `vineetkr.com`:
- **GoDaddy**: [dcc.godaddy.com](https://dcc.godaddy.com/)
- **Namecheap**: [namecheap.com](https://www.namecheap.com/myaccount/login/)
- **Google Domains**: [domains.google.com](https://domains.google.com/)
- **Cloudflare**: [dash.cloudflare.com](https://dash.cloudflare.com/)

#### Step 3: Configure DNS Records

##### Option A: API Subdomain (Recommended)

Make your API accessible at `https://api.vineetkr.com`

**Add CNAME Record:**
```
Type: CNAME
Name: api
Value: vineetkr-api-production.up.railway.app (your Railway URL without https://)
TTL: 3600 (or Auto)
```

**Or use A Record (if platform provides IP):**
```
Type: A
Name: api
Value: 123.45.67.89 (IP address from hosting platform)
TTL: 3600
```

##### Option B: Main Domain with Path

Keep API on main domain: `https://vineetkr.com/api`

**Add CNAME Record:**
```
Type: CNAME
Name: www (or @)
Value: vineetkr-api-production.up.railway.app
TTL: 3600
```

#### Step 4: Configure Custom Domain on Platform

**Railway:**
1. Go to your project settings
2. Click "Domains" tab
3. Click "Custom Domain"
4. Enter: `api.vineetkr.com`
5. Railway will verify DNS and provide SSL certificate

**Render:**
1. Go to your service
2. Click "Settings" → "Custom Domain"
3. Add `api.vineetkr.com`
4. Follow DNS verification steps

**Heroku:**
```bash
heroku domains:add api.vineetkr.com
# Follow the DNS target provided
```

#### Step 5: Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours. Check status:

```bash
# Check DNS propagation
dig api.vineetkr.com

# Or use online tools
# https://dnschecker.org/
```

#### Step 6: Update CORS Configuration

Once domain is connected, update your CORS settings in [src/server.js](src/server.js):

```javascript
// Before (development)
app.use(cors());

// After (production)
app.use(cors({
  origin: [
    'https://vineetkr.com',
    'https://www.vineetkr.com',
    'http://localhost:3000' // For local testing
  ],
  credentials: true
}));
```

### Platform-Specific Domain Setup

#### Railway Custom Domain Setup

1. **Deploy your app** on Railway
2. **Go to Settings** → "Domains"
3. **Add Custom Domain**: `api.vineetkr.com`
4. **Add DNS Record** at your registrar:
   ```
   CNAME: api → vineetkr-api-production.up.railway.app
   ```
5. **Wait for verification** (usually 5-10 minutes)
6. **SSL Certificate**: Auto-generated by Railway

#### Render Custom Domain Setup

1. **Deploy on Render**
2. **Service Settings** → "Custom Domain"
3. **Add domain**: `api.vineetkr.com`
4. **Copy CNAME value** provided by Render
5. **Add to DNS**:
   ```
   CNAME: api → [value from Render]
   ```
6. **Verify**: Click "Verify DNS"

#### Vercel (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add domain
vercel domains add api.vineetkr.com
```

### DNS Record Examples

#### Example 1: GoDaddy

```
Type    Name    Value                                    TTL
CNAME   api     vineetkr-api-production.up.railway.app   1 Hour
```

#### Example 2: Cloudflare

```
Type    Name    Content                                  Proxy   TTL
CNAME   api     vineetkr-api-production.up.railway.app   ✅      Auto
```

#### Example 3: Namecheap

```
Type         Host    Value                                    TTL
CNAME Record api     vineetkr-api-production.up.railway.app   Automatic
```

### Testing Your Domain Connection

Once DNS propagates, test your API:

```bash
# Test with curl
curl https://api.vineetkr.com/
curl https://api.vineetkr.com/api/users

# Create a user
curl -X POST https://api.vineetkr.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@vineetkr.com","age":25}'
```

**Expected Response:**
```json
{
  "message": "Welcome to VineetKR API",
  "version": "1.0.0",
  "endpoints": {
    "getUsers": "GET /api/users",
    "createUser": "POST /api/users",
    "updateUser": "PUT /api/users/:id"
  }
}
```

### SSL Certificate (HTTPS)

Most platforms automatically provide free SSL certificates:

- **Railway**: Auto SSL via Let's Encrypt ✅
- **Render**: Auto SSL via Let's Encrypt ✅
- **Heroku**: Auto SSL (Automated Certificate Management) ✅
- **Vercel**: Auto SSL ✅

**Manual SSL (if needed):**
- Use [Let's Encrypt](https://letsencrypt.org/) (free)
- Use [Cloudflare](https://www.cloudflare.com/) (free proxy + SSL)

### Subdomain Strategy Recommendations

**Option 1: API Subdomain (Best Practice)**
```
Main site:  https://vineetkr.com          → Portfolio/Blog
API:        https://api.vineetkr.com      → REST API
Admin:      https://admin.vineetkr.com    → Admin panel (future)
```

**Option 2: Path-based**
```
Main site:  https://vineetkr.com          → Portfolio/Blog
API:        https://vineetkr.com/api      → REST API
```

**Recommended**: Option 1 (subdomain) for better separation and scalability.

### Update Environment Variables for Production

Once deployed with custom domain, update your `.env` or platform environment variables:

```bash
# Railway/Render Environment Variables
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vineetkr-db
ALLOWED_ORIGINS=https://vineetkr.com,https://www.vineetkr.com
```

### Complete Example: Railway + Custom Domain

**1. Deploy to Railway:**
```bash
git init
git add .
git commit -m "Deploy API"
git push origin main
# Connect repo on railway.app
```

**2. Add MongoDB:**
- Click "New" → "Database" → "MongoDB"
- Railway auto-sets `MONGODB_URI`

**3. Add Custom Domain:**
- Settings → Domains → "Custom Domain"
- Enter: `api.vineetkr.com`

**4. Configure DNS (GoDaddy example):**
```
Type: CNAME
Name: api
Value: vineetkr-api-production.up.railway.app
```

**5. Wait & Verify:**
```bash
# Check DNS
dig api.vineetkr.com

# Test API
curl https://api.vineetkr.com/
```

**6. Done! Your API is live at:**
- `https://api.vineetkr.com/api/users`

### Troubleshooting Domain Connection

**DNS not resolving:**
```bash
# Check DNS propagation
nslookup api.vineetkr.com
dig api.vineetkr.com

# Use online checker
# https://www.whatsmydns.net/
```

**SSL Certificate Issues:**
- Wait 10-15 minutes after DNS verification
- Platform auto-generates SSL
- Check platform logs for errors

**CORS Errors:**
- Update CORS origin in `server.js`
- Include both `http` and `https` versions during testing
- Remove `localhost` in production

**502 Bad Gateway:**
- Check if app is running on platform
- Verify environment variables are set
- Check platform logs for errors

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env file
PORT=3001
```

### MongoDB Connection Error

```bash
# Check if MongoDB is running (Docker)
docker ps

# Check MongoDB logs
docker logs mongodb

# Restart MongoDB
docker restart mongodb
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error in Browser

- Check if CORS is enabled in `server.js`
- For specific origins, update CORS configuration

### Cannot GET /api/users

- Ensure server is running (`npm run dev`)
- Check URL is correct
- Verify MongoDB is connected

## 📚 Additional Resources

### Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Zod Documentation](https://zod.dev/)

### Tutorials

- [REST API Design Best Practices](https://restfulapi.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [MongoDB University](https://university.mongodb.com/) - Free courses

### Tools

- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
- [Insomnia](https://insomnia.rest/) - Alternative to Postman

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vineet Kumar**

- Domain: [vineetkr.com](https://www.vineetkr.com/)
- API Endpoint: `https://api.vineetkr.com/` (when deployed)

## 🎯 Next Steps

### Enhancements to Consider:

1. **Add DELETE endpoint** for removing users
2. **Implement pagination** for GET all users
3. **Add search/filter** functionality
4. **User authentication** with JWT
5. **API rate limiting** to prevent abuse
6. **Request logging** for debugging
7. **Unit tests** with Jest/Mocha
8. **API documentation** with Swagger/OpenAPI
9. **Email validation** on user creation
10. **Profile pictures** upload with Multer

### Security Enhancements:

- Add helmet.js for security headers
- Implement input sanitization
- Add request validation middleware
- Use environment-based CORS configuration
- Add API key authentication
- Implement rate limiting per IP

---

**Happy Coding! 🚀**
