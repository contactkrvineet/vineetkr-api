# Push to GitHub Instructions

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `vineetkr-api`
3. Description: `REST API for vineetkr.com with GET, POST, PUT endpoints`
4. Choose Public or Private
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
# Add your GitHub repository as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/vineetkr-api.git

# Or if using SSH
git remote add origin git@github.com:USERNAME/vineetkr-api.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify

Visit your repository at:
https://github.com/USERNAME/vineetkr-api

## Quick Command Template

Copy and run (replace USERNAME):

```bash
git remote add origin https://github.com/USERNAME/vineetkr-api.git
git branch -M main
git push -u origin main
```

## If You Get Errors

### Error: remote origin already exists
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/vineetkr-api.git
git push -u origin main
```

### Error: Authentication failed
```bash
# Use GitHub Personal Access Token instead of password
# Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

## Future Updates

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```
