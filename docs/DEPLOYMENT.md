# PolydraIQ Deployment Guide

This guide covers how to build and deploy the standalone PolydraIQ application from this repository.

## ✅ Pre-deployment Checklist

- TypeScript compilation succeeds
- Lint checks pass
- Jest test suite passes
- Production build completes without errors

## 🧱 Build & Verification Commands

From the repository root:

```bash
# Install dependencies
npm install

# Lint the codebase
npm run lint

# Run the test suite
npm test

# Type-check the code
npm run type-check

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The default Vite dev server runs at:

```text
http://localhost:3000
```

## 🌐 Static Deployment Targets

The app is a static React + Vite SPA and can be hosted on any static host.

### Vercel
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Root Directory:** `/`

### Netlify
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

### AWS S3 + CloudFront
1. Run `npm run build`
2. Upload the contents of `dist/` to an S3 bucket
3. Configure CloudFront to serve from that bucket
4. Enable gzip/brotli compression and caching headers

### Docker (Optional)

You can wrap the production build in a small Nginx image:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔍 Post-deployment Verification

After deploying, validate:

- 3D cube visualization loads and rotates correctly
- Guided Assessment opens and navigates between sections
- Questions can be answered and scores are calculated
- Manual sliders update the cube and composite score
- Maturity level indicator responds to score changes

### Performance Checks
- Initial page load under a few seconds on a standard connection
- Smooth interactions with 3D visualization
- No errors or significant warnings in the browser console

### Mobile Responsiveness
- Layout adapts correctly on tablet and mobile widths
- Questionnaire remains usable on smaller screens
- Touch interactions work for key controls

## 📈 Future Deployment Enhancements

- Add a service worker for asset caching
- Introduce route-based code splitting for heavier areas
- Wire in a performance budget via CI (Lighthouse or similar)

Deployment here is intentionally straightforward so forks can host their own instances with minimal friction.
