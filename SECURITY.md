# Security & Secret Keys Guide

## Current Status

✅ `.env` file is gitignored (safe)
❌ No authentication implemented (API is open to anyone)

## Sensitive Data in Your Project

### MongoDB URI (If using Atlas)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vineetkr-db
```
☝️ Contains database credentials - NEVER commit this!

## Adding Authentication (Optional)

If you want to secure your API, here's what to add:

### 1. Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vineetkr-db
NODE_ENV=development

# Authentication Secrets
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRES_IN=7d

# API Key (for simple auth)
API_KEY=your-api-key-here-change-this

# Session Secret (if using sessions)
SESSION_SECRET=your-session-secret-here
```

### 2. Generate Secure Secrets

```bash
# Generate random secret (macOS/Linux)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use this command
openssl rand -hex 32
```

Example output: `a7f3d8b2e1c4f6a9b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7`

## Implementation Examples

### Option 1: JWT Authentication

**Install dependencies:**
```bash
npm install jsonwebtoken bcrypt
```

**Update .env:**
```env
JWT_SECRET=a7f3d8b2e1c4f6a9b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7
JWT_EXPIRES_IN=7d
```

**Create auth middleware (src/middleware/auth.js):**
```javascript
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
```

**Protect routes:**
```javascript
import { authenticate } from '../middleware/auth.js';

router.get('/', authenticate, getUsers);
router.post('/', authenticate, createUser);
router.put('/:id', authenticate, updateUser);
```

### Option 2: Simple API Key

**Update .env:**
```env
API_KEY=vineetkr-api-key-2025-secure-key-123456
```

**Create middleware (src/middleware/apiKey.js):**
```javascript
export const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key'
    });
  }
  
  next();
};
```

**Use in routes:**
```javascript
import { requireApiKey } from '../middleware/apiKey.js';

router.post('/', requireApiKey, createUser);
router.put('/:id', requireApiKey, updateUser);
```

**Client usage:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "x-api-key: vineetkr-api-key-2025-secure-key-123456" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## Security Best Practices

### 1. Never Commit Secrets
✅ `.env` is in `.gitignore`
✅ Use `.env.example` for reference (without real values)
❌ Never commit actual secrets to GitHub

### 2. Use Strong Secrets
```bash
# Good: Random, long, unique
JWT_SECRET=a7f3d8b2e1c4f6a9b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7b3d8e2f1c4a7

# Bad: Weak, guessable
JWT_SECRET=mysecret
JWT_SECRET=12345678
```

### 3. Different Secrets for Each Environment
```
Development:  JWT_SECRET=dev-secret-key-here
Production:   JWT_SECRET=prod-secret-key-different
```

### 4. Environment Variables on Hosting Platforms

**Railway:**
- Go to project → Variables
- Add secrets there (not in .env file)

**Render:**
- Service → Environment → Add Variable
- Add `JWT_SECRET`, `API_KEY`, etc.

**Heroku:**
```bash
heroku config:set JWT_SECRET=your-secret-here
heroku config:set API_KEY=your-api-key-here
```

## Verify .env is Gitignored

```bash
# Check what will be committed
git status

# .env should NOT appear in the list
# If it does, run:
git rm --cached .env
```

## If You Accidentally Committed Secrets

**1. Remove from git history:**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push --force
```

**2. Rotate (change) the secrets immediately:**
- Generate new JWT_SECRET
- Change MongoDB password
- Update API keys

**3. Use tools to scan:**
```bash
# Install git-secrets
brew install git-secrets

# Scan repo
git secrets --scan
```

## Current Project Status

Your project is currently safe:
- ✅ `.env` is gitignored
- ✅ No secrets in code
- ✅ Using local MongoDB (no credentials needed)

**When moving to production:**
1. Use MongoDB Atlas (add credentials to .env)
2. Add JWT_SECRET for authentication
3. Set environment variables on hosting platform
4. Never commit actual .env file

## Quick Security Checklist

- [ ] `.env` is in `.gitignore` ✅ (Already done)
- [ ] `.env` is never committed ✅ (Already done)
- [ ] Using `.env.example` for reference ✅ (Already created)
- [ ] Secrets are random and strong (If adding auth)
- [ ] Different secrets for dev/prod (When deploying)
- [ ] Secrets stored in platform environment variables (When deploying)
