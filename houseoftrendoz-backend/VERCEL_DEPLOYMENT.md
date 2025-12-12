# Vercel Deployment Guide

This guide will help you deploy the Houseoftrendoz backend to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. MongoDB Atlas account (or your MongoDB connection string)
3. Vercel CLI installed (optional, for CLI deployment)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   - Make sure your `houseoftrendoz-backend` folder is committed and pushed to a GitHub repository

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - **Important**: Set the "Root Directory" to `houseoftrendoz-backend`
   - Click "Deploy"

3. **Configure Environment Variables**
   - After the initial deployment, go to Project Settings → Environment Variables
   - Add the following environment variables:
     ```
     MONGO=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key_here
     PORT=5000
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```
   - Make sure to add them for all environments (Production, Preview, Development)
   - Click "Save" and redeploy

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend directory**
   ```bash
   cd houseoftrendoz-backend
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for the project root, make sure you're in the `houseoftrendoz-backend` directory

5. **Set Environment Variables**
   ```bash
   vercel env add MONGO
   vercel env add JWT_SECRET
   vercel env add PORT
   vercel env add RAZORPAY_KEY_ID
   vercel env add RAZORPAY_KEY_SECRET
   ```
   - Enter the values when prompted
   - Make sure to add them for all environments

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

Make sure to set these environment variables in Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/houseoftrendoz` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_jwt_key_here` |
| `PORT` | Server port (optional, defaults to 5000) | `5000` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret | `your_razorpay_secret` |

## Important Notes

### ⚠️ File Upload Limitations

**Vercel is a serverless platform and does NOT support persistent file storage.**

The current implementation uses local file storage (`uploads/products/`), which **will NOT work** on Vercel because:
- Files uploaded to Vercel's filesystem are temporary and will be lost
- Each serverless function invocation has a read-only filesystem (except `/tmp`)

### Solutions for File Uploads

You have two options:

#### Option A: Use Cloud Storage (Recommended)
Integrate with a cloud storage service:
- **Cloudinary** (recommended for images)
- **AWS S3**
- **Google Cloud Storage**
- **Azure Blob Storage**

#### Option B: Disable File Uploads Temporarily
Comment out file upload routes until cloud storage is integrated.

### MongoDB Atlas Setup

If you're using MongoDB Atlas:

1. Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist Vercel's IP addresses (or use `0.0.0.0/0` for all IPs)
4. Get your connection string and add it to Vercel environment variables

### CORS Configuration

The backend currently allows CORS from all origins. If you want to restrict it:

1. Update `server.js` to only allow your frontend domain:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.vercel.app'
   }));
   ```

## Post-Deployment

1. **Test your API endpoints**
   - Your API will be available at `https://your-project.vercel.app/api`
   - Test endpoints like: `https://your-project.vercel.app/api/products`

2. **Update Frontend API URL**
   - Update your frontend to use the new Vercel backend URL
   - Replace `http://localhost:5000/api` with `https://your-project.vercel.app/api`

3. **Monitor Logs**
   - Check Vercel dashboard → Functions → Logs for any errors
   - Monitor MongoDB Atlas for connection issues

## Troubleshooting

### Database Connection Issues
- Verify MongoDB connection string is correct
- Check MongoDB Atlas IP whitelist includes Vercel IPs
- Ensure database user has proper permissions

### Environment Variables Not Working
- Make sure variables are set for the correct environment (Production/Preview)
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### Function Timeout
- Vercel free tier has a 10-second timeout for serverless functions
- Hobby plan has 60-second timeout
- Consider optimizing slow database queries

### CORS Errors
- Verify CORS configuration in `server.js`
- Check that frontend URL is whitelisted if you restricted CORS

## Next Steps

1. Set up cloud storage for file uploads (Cloudinary recommended)
2. Configure custom domain (optional)
3. Set up monitoring and error tracking
4. Configure rate limiting for production

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

