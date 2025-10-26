# Deployment Guide

This guide will help you deploy the UrbanGo application with the backend on Render and frontend on Vercel.

## Backend Deployment (Render)

### Prerequisites
1. Create a [Render](https://render.com) account
2. Have your MongoDB connection string ready
3. Have your Stripe secret key ready

### Steps
1. **Connect Repository**
   - Go to Render dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory

2. **Configure Build Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18 or higher

3. **Environment Variables**
   Set the following environment variables in Render:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Vercel)

### Prerequisites
1. Create a [Vercel](https://vercel.com) account
2. Have your backend URL from Render
3. Have your Stripe publishable key ready

### Steps
1. **Connect Repository**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   Set the following environment variables in Vercel:
   ```
   VITE_API_URL=https://your-backend-app.onrender.com
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://your-app.vercel.app`)

## Post-Deployment Configuration

### Update Backend CORS
After deploying the frontend, update the `FRONTEND_URL` environment variable in your Render backend service to match your Vercel domain.

### Update Frontend API URL
Ensure the `VITE_API_URL` in your Vercel environment variables points to your Render backend URL.

## Testing Deployment

1. **Backend Health Check**
   - Visit `https://your-backend-app.onrender.com/health`
   - Should return a JSON response with status "healthy"

2. **Frontend Functionality**
   - Visit your Vercel URL
   - Test API calls to ensure frontend can communicate with backend
   - Test Stripe payment functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend matches your Vercel domain exactly
   - Check that there are no trailing slashes

2. **Environment Variables Not Loading**
   - Verify all environment variables are set correctly
   - Redeploy after adding new environment variables

3. **Build Failures**
   - Check build logs for specific error messages
   - Ensure all dependencies are listed in package.json

4. **API Connection Issues**
   - Verify `VITE_API_URL` points to correct backend URL
   - Check network tab in browser dev tools for failed requests

### Support
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs""  
