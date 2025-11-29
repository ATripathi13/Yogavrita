# YOGAVRITA Deployment Guide

This guide explains how to deploy the YOGAVRITA app to various hosting platforms.

## Quick Deploy Options

### Option 1: Netlify (Recommended)

1. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

2. **Via Netlify Dashboard:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings are already configured in `netlify.toml`
   - Click "Deploy site"

### Option 2: Vercel

1. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   npm run build
   vercel --prod
   ```

2. **Via Vercel Dashboard:**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your Git repository
   - Build settings are already configured in `vercel.json`
   - Click "Deploy"

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create new
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub auto-deploy: Optional

3. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 5: AWS S3 + CloudFront

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Create S3 bucket:**
   - Go to AWS S3 Console
   - Create bucket with public access
   - Enable static website hosting

3. **Upload files:**
   - Upload all files from `dist` folder
   - Set index.html as index document

4. **Configure CloudFront (Optional):**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

## Environment Variables

The app doesn't require environment variables as it uses browser LocalStorage. However, if you add external services in the future:

1. Create `.env` file (not committed to Git)
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Access in code: `import.meta.env.VITE_API_URL`

## Custom Domain Setup

### Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed

### Vercel:
1. Go to Project settings → Domains
2. Add domain
3. Configure DNS records as instructed

### GitHub Pages:
1. Add CNAME file to `public` folder with your domain
2. Configure DNS:
   - A record: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - Or CNAME: username.github.io

## Performance Optimization

The app is already optimized with:
- Code splitting
- Minification
- CSS optimization
- Tree shaking

For additional optimization:
1. Enable gzip/brotli compression on your hosting
2. Set cache headers for static assets
3. Use CDN for faster global delivery

## Monitoring

After deployment, monitor:
- Page load times
- Error rates (use browser console)
- User engagement (add analytics if needed)

## Troubleshooting

### Build fails:
- Check Node.js version (18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

### App doesn't load:
- Check browser console for errors
- Verify base URL in vite.config.ts
- Check routing configuration

### LocalStorage issues:
- Ensure browser allows LocalStorage
- Check browser privacy settings
- Test in incognito mode

## Support

For deployment issues, check:
- Vite documentation: https://vitejs.dev/guide/static-deploy.html
- Platform-specific docs (Netlify, Vercel, etc.)
