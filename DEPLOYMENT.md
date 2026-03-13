# 🚀 Production Deployment Guide

This guide covers deploying Gelato Luxe to production on various platforms.

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All features tested locally
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Firebase rules configured
- [ ] Admin user created in Firebase
- [ ] All Firestore collections created
- [ ] Images optimized and added
- [ ] Build succeeds: `npm run build`
- [ ] `.env.local` is NOT committed to git
- [ ] `.gitignore` is configured correctly

---

## Option 1: Deploy to Vercel (Easiest) ⭐ Recommended

Vercel is the creators of Next.js and offers the best deployment experience.

### Step 1: Prepare Your Code
```bash
# Make sure everything is committed to git
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 3: Import Project
1. Click "Add New..." > "Project"
2. Select your GitHub repository
3. Click "Import"

### Step 4: Configure Environment Variables
1. In the import dialog, expand "Environment Variables"
2. Add all variables from your `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
   NEXT_PUBLIC_FIREBASE_APP_ID=your_value
   ```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your live site

### Step 6: Configure Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration steps

### Subsequent Deployments
- Push to main branch automatically triggers deployment
- Check deployments tab for status

---

## Option 2: Deploy to Netlify

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Authorize Netlify

### Step 3: Connect Repository
1. Click "Add new site" > "Import an existing project"
2. Select GitHub
3. Choose your repository

### Step 4: Configure Build Settings
1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Node version:** 18 or higher

### Step 5: Add Environment Variables
1. Go to Site settings > Build & deploy > Environment
2. Add environment variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
   NEXT_PUBLIC_FIREBASE_APP_ID=your_value
   ```

### Step 6: Deploy
1. Click "Deploy"
2. Wait for build to complete

### Step 7: Configure Custom Domain (Optional)
1. Go to Site settings > Domain management
2. Add your custom domain

---

## Option 3: Deploy to Firebase Hosting

### Step 1: Install Firebase Tools
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase Project
```bash
firebase init hosting
```

When prompted:
- Select your Firebase project
- Public directory: `.next`
- Configure as single-page app: No
- Set up automatic builds: Yes (optional)

### Step 4: Build Your Project
```bash
npm run build
```

### Step 5: Deploy
```bash
firebase deploy
```

Your site will be live at: `https://your-project.web.app`

### Step 6: Configure Custom Domain (Optional)
1. Go to Firebase Console > Hosting
2. Click "Connect domain"
3. Follow DNS configuration steps

---

## Option 4: Deploy to Docker Container

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Create .dockerignore
```
node_modules
.next
.git
.env.local
```

### Step 3: Build Docker Image
```bash
docker build -t gelato-luxe .
```

### Step 4: Run Locally
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_FIREBASE_API_KEY=... gelato-luxe
```

### Step 5: Deploy to Cloud Service
- **Google Cloud Run:** `gcloud run deploy`
- **AWS ECS:** Push to ECR, deploy via ECS
- **DigitalOcean App Platform:** Connect GitHub, auto-deploy
- **Railway:** Connect GitHub, auto-deploy

---

## Post-Deployment

### Verify Deployment
1. Visit your live site
2. Test all pages load correctly
3. Test contact form
4. Test job application form
5. Test admin login
6. Check console for errors
7. Test on mobile devices

### Set Up Monitoring
1. Google Analytics integration
2. Firebase Analytics
3. Error tracking (Sentry, etc.)
4. Performance monitoring

### Configure Email (Optional)
1. Set up SendGrid or Mailgun
2. Configure transactional emails
3. Set up form notifications
4. Update admin email addresses

### Performance Optimization
1. Enable caching headers
2. Set up CDN
3. Optimize images
4. Monitor performance metrics

---

## Environment Variables for Production

### Required Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Optional Variables
```env
NEXT_PUBLIC_SITE_NAME=Gelato Luxe
NEXT_PUBLIC_SITE_EMAIL=hello@gelatoluxe.com
NEXT_PUBLIC_SITE_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

## Domain Configuration

### Add Custom Domain

#### For Vercel:
1. Project Settings > Domains
2. Add domain
3. Update DNS records at your registrar

#### For Netlify:
1. Site settings > Domain management
2. Add custom domain
3. Update DNS records at your registrar

#### For Firebase:
1. Hosting > Domains
2. Connect domain
3. Update DNS records at your registrar

### DNS Records
Typically you'll need to update:
- A record pointing to hosting provider's IP
- CNAME record pointing to subdomain

Check your hosting provider's instructions for specific DNS settings.

---

## SSL/TLS Certificate

All hosting platforms provide free SSL certificates:
- **Vercel:** Automatic (Let's Encrypt)
- **Netlify:** Automatic (Let's Encrypt)
- **Firebase:** Automatic (Google-managed)
- **Docker:** Configure with reverse proxy (Nginx, Caddy)

---

## Rollback Instructions

### If Something Goes Wrong

#### Vercel
1. Go to Deployments tab
2. Click on a previous deployment
3. Click "Promote to Production"

#### Netlify
1. Go to Deploys
2. Click on a previous build
3. Click "Publish Deploy"

#### Firebase
```bash
# View deployment history
firebase hosting:channel:list

# Deploy previous version
firebase hosting:clone <source-version> production
```

#### Docker
```bash
# Rollback to previous image
docker run -p 3000:3000 gelato-luxe:previous-tag
```

---

## Monitoring & Maintenance

### Set Up Alerts For:
- Build failures
- Deployment errors
- High error rates
- Performance degradation
- Downtime

### Regular Tasks
- Monitor error logs
- Check performance metrics
- Review user analytics
- Backup database
- Update dependencies
- Review security

---

## Troubleshooting Deployment

### Build Fails
1. Check build logs
2. Ensure all environment variables are set
3. Run `npm run build` locally
4. Check Node version compatibility

### Site Shows Error
1. Check Firestore rules
2. Verify environment variables
3. Check Firebase credentials
4. Review error logs

### Forms Not Working
1. Verify Firestore collections exist
2. Check security rules
3. Test with browser console
4. Check Firebase quota limits

### Performance Issues
1. Enable caching
2. Optimize images
3. Use CDN
4. Check database queries
5. Monitor bundle size

---

## Cost Estimates

### Vercel
- **Free:** Up to 100GB bandwidth/month
- **Pro:** $20/month + overages
- Usually free tier is sufficient

### Netlify
- **Free:** Up to 100GB bandwidth/month
- **Pro:** $19/month + overages
- Usually free tier is sufficient

### Firebase
- **Spark:** Free tier (limited)
- **Blaze:** Pay-as-you-go
- Cost depends on usage

### Estimate Monthly Costs
For a typical ice cream shop site:
- **Traffic:** 10,000 visits/month
- **Database:** ~100,000 reads/month
- **Storage:** ~500MB

Rough estimates:
- Vercel: **Free**
- Netlify: **Free**
- Firebase: **$5-15/month**
- Self-hosted: **$10-30/month**

---

## Next Steps

1. Choose deployment platform
2. Follow setup instructions
3. Deploy to staging first (optional)
4. Deploy to production
5. Configure custom domain
6. Set up monitoring
7. Test thoroughly
8. Celebrate! 🎉

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Last Updated:** March 2026
**Version:** 1.0.0
