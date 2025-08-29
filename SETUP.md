# PolydraIQ Standalone Setup Instructions

This directory contains the standalone version of PolydraIQ extracted from the Nx monorepo.

## Quick Start

```bash
# Navigate to the standalone project
cd polydra-ai-standalone

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Creating Your Own Repository

### Option 1: Create New Repository on GitHub
1. Create a new repository on GitHub named `polydra-ai`
2. Copy this entire directory to a new location outside the monorepo
3. Initialize and push to the new repository:

```bash
# Copy the directory (from outside the monorepo)
cp -r /Users/jwdev/reactlabs-monorepo/polydra-ai-standalone /path/to/your/new/location/polydra-ai

# Navigate to the new location
cd /path/to/your/new/location/polydra-ai

# Add your remote repository
git remote add origin https://github.com/reactlabs-dev/polydra-ai.git

# Add all files and make initial commit
git add .
git commit -m "Initial commit: Polydra.ai standalone application"

# Push to GitHub
git push -u origin main
```

### Option 2: Move Directory and Reset Git
```bash
# Move the directory outside the monorepo
mv /Users/jwdev/reactlabs-monorepo/polydra-ai-standalone /Users/jwdev/polydra-ai

# Navigate to new location
cd /Users/jwdev/polydra-ai

# Remove existing git history and reinitialize
rm -rf .git
git init
git branch -m main

# Add your remote
git remote add origin https://github.com/reactlabs-dev/polydra-ai.git

# Initial commit
git add .
git commit -m "Initial commit: Polydra.ai standalone application"
git push -u origin main
```

## Key Changes Made

1. **Standalone package.json**: Removed Nx dependencies, added standard Vite + React setup
2. **Updated vite.config.ts**: Removed Nx plugins, configured for standalone operation
3. **Fixed imports**: Updated React DOM imports for React 18
4. **Added configuration files**: ESLint, Jest, .gitignore
5. **Preserved all features**: Legal modal, Credits, About, assessment functionality

## Project Structure

```
polydra-ai-standalone/
├── src/
│   ├── app/
│   │   ├── components/
│   │   └── pages/
│   ├── assets/
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **AWS S3 + CloudFront**: Upload build artifacts to S3 bucket
- **Docker**: Create Dockerfile for containerized deployment

## Next Steps

1. Move this directory outside the monorepo
2. Create a new GitHub repository
3. Push the code to your new repository
4. Set up deployment pipeline (Vercel recommended)
5. Configure custom domain if needed

The application is fully functional and deployment-ready!