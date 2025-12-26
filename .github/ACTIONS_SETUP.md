# GitHub Actions CI/CD Setup

This project uses GitHub Actions for continuous integration and deployment.

## Setup Instructions

### 1. Get Vercel Token

```bash
vercel login
vercel --token
```

Copy the token that's displayed.

### 2. Get Vercel Project IDs

```bash
cat .vercel/project.json
```

Copy the `orgId` and `projectId`.

### 3. Add Secrets to GitHub

Go to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

| Secret Name         | Value             | Where to find                   |
| ------------------- | ----------------- | ------------------------------- |
| `VERCEL_TOKEN`      | Your Vercel token | Run `vercel --token`            |
| `VERCEL_ORG_ID`     | Your org/team ID  | Found in `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your project ID   | Found in `.vercel/project.json` |

### 4. Environment Variables (Already set in Vercel)

These are already configured in Vercel dashboard:

- `MONGODB_URI`
- `NODE_ENV`
- `ALLOWED_ORIGINS`

### 5. Workflow Triggers

The workflow runs on:

- Push to `main` or `prac` branch
- Pull requests to `main`

### 6. Manual Deployment

You can also deploy manually:

```bash
vercel --prod
```

## Workflow Steps

1. **Build**: Install dependencies and run tests
2. **Deploy**: Deploy to Vercel production (only on main/prac branches)

## Status Badge

Add this to your README.md:

```markdown
![Deploy Status](https://github.com/contactkrvineet/vineetkr-api/workflows/Deploy%20API/badge.svg)
```
