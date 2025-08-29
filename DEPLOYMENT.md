# Polydra.ai SQI App Deployment Guide

## Pre-deployment Checklist

✅ All lint issues resolved
✅ TypeScript compilation successful  
✅ Build process completes without errors
✅ App starts successfully in development mode

## Deployment Commands

### 1. Lint Check
```bash
nx lint sqi
```

### 2. Type Check
```bash
npx tsc --project apps/sqi/tsconfig.json --noEmit
```

### 3. Build for Production
```bash
nx build sqi
```

### 4. Preview Production Build
```bash
nx preview sqi
```

## Vercel Deployment

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `nx build sqi`
- **Output Directory:** `dist/apps/sqi`
- **Install Command:** `npm install`
- **Root Directory:** `/` (monorepo root)

### Environment Variables
No special environment variables required for basic deployment.

### Build Optimizations Included
- Manual chunk splitting for better caching
- Vendor libraries separated from app code
- PrimeReact components bundled separately
- Three.js isolated in its own chunk
- Increased chunk size warning limit to 1000kb

## Post-deployment Verification

1. **Functionality Check:**
   - 3D cube visualization loads and rotates correctly
   - Guided Assessment opens and navigates between tabs
   - Questions can be answered and scores calculated
   - Manual sliders work and update the cube
   - Maturity level indicator updates based on scores

2. **Performance Check:**
   - Initial page load < 3 seconds
   - Cube interactions are smooth
   - No console errors or warnings

3. **Mobile Responsiveness:**
   - Interface adapts to tablet/mobile screens
   - Touch interactions work for cube rotation
   - Questionnaire is usable on smaller screens

## Troubleshooting

### Common Issues:

1. **Bundle Size Warnings:**
   - Expected due to Three.js and PrimeReact
   - Optimized with manual chunks
   - Consider lazy loading for further optimization

2. **PrimeReact Styles:**
   - All required PrimeReact components are imported
   - PrimeIcons font files included in build

3. **Three.js Performance:**
   - WebGL support required
   - Fallback handling in place for older browsers

## Future Optimizations

1. **Code Splitting:**
   - Lazy load Questionnaire dialog
   - Dynamic imports for Three.js scene
   - Route-based splitting if multi-page

2. **Caching:**
   - Service worker implementation
   - Asset caching strategies
   - API response caching

3. **Performance:**
   - Three.js WebWorker for heavy computations
   - Optimized texture compression
   - Reduced model complexity options

## Monitoring

Monitor these key metrics post-deployment:
- Bundle size impact on load times
- WebGL compatibility across devices
- User engagement with Guided Assessment
- Completion rates for questionnaires