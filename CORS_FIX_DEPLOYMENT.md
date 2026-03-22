# CORS Fix - Deployment Instructions

## Problem
CORS error when frontend (Render) tries to access backend (Render):
```
Access to fetch at 'https://online-book-sharing-system-backend.onrender.com/api/auth/register' 
from origin 'https://online-book-sharing-system-client.onrender.com' has been blocked by CORS policy
```

## Solution Applied

### 1. Backend CORS Configuration Updated ✅
File: `backend/server.js`

Added dynamic CORS with:
- Frontend production URL
- Proper preflight handling
- All required headers
- Credentials support

### 2. Environment Variables Updated ✅
File: `backend/.env`

Added:
```env
CLIENT_URL=https://online-book-sharing-system-client.onrender.com
NODE_ENV=production
```

## Deployment Steps on Render

### Backend (online-book-sharing-system-backend.onrender.com)

1. **Go to Render Dashboard** → Your Backend Service

2. **Environment Variables** - Add/Update:
   ```
   NODE_ENV=production
   PORT=5003
   CLIENT_URL=https://online-book-sharing-system-client.onrender.com
   MONGO_URI=mongodb+srv://onilnebookshare_db_user:sikar123@book.rnnzfn9.mongodb.net/onlinebookshare_db?retryWrites=true&w=majority&appName=book
   JWT_SECRET=bookshare_jwt_secret_2024
   JWT_REFRESH_SECRET=bookshare_refresh_secret_2024
   JWT_EXPIRE=7d
   JWT_REFRESH_EXPIRE=30d
   RAZORPAY_KEY_ID=rzp_test_SJTNOuxzzNduur
   RAZORPAY_KEY_SECRET=L7ryoHaTAbaJVbsxGEzYKrS3
   ```

3. **Build Command**:
   ```bash
   cd backend && npm install
   ```

4. **Start Command**:
   ```bash
   cd backend && node server.js
   ```

5. **Redeploy** - Click "Manual Deploy" → "Deploy latest commit"

### Frontend (online-book-sharing-system-client.onrender.com)

1. **Environment Variables** - Add/Update:
   ```
   REACT_APP_API_URL=https://online-book-sharing-system-backend.onrender.com/api
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_SJTNOuxzzNduur
   ```

2. **Build Command**:
   ```bash
   npm install && npm run build
   ```

3. **Start Command**:
   ```bash
   npx serve -s build -l 3000
   ```

4. **Redeploy**

## Verification Steps

1. **Test Backend Health**:
   ```
   https://online-book-sharing-system-backend.onrender.com/health
   ```
   Should return:
   ```json
   {
     "success": true,
     "message": "BookShare API is running",
     "database": "Connected"
   }
   ```

2. **Test CORS**:
   Open browser console on frontend and run:
   ```javascript
   fetch('https://online-book-sharing-system-backend.onrender.com/api/test')
     .then(r => r.json())
     .then(console.log)
   ```

3. **Test Registration**:
   - Go to signup page
   - Fill form and submit
   - Should work without CORS error

## Common Issues & Fixes

### Issue 1: Still Getting CORS Error
**Fix**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue 2: 404 on API Routes
**Fix**: Check backend logs on Render dashboard

### Issue 3: Backend Not Starting
**Fix**: Check environment variables are set correctly

### Issue 4: Database Connection Failed
**Fix**: Verify MONGO_URI is correct and MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

## Quick Test Commands

### Test from Terminal:
```bash
# Test health endpoint
curl https://online-book-sharing-system-backend.onrender.com/health

# Test with CORS headers
curl -H "Origin: https://online-book-sharing-system-client.onrender.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://online-book-sharing-system-backend.onrender.com/api/auth/register
```

## Files Modified

1. ✅ `backend/server.js` - CORS configuration
2. ✅ `backend/.env` - Environment variables
3. ✅ `render.yaml` - Deployment configuration

## After Deployment

Both services should work together without CORS errors. The backend now accepts requests from:
- http://localhost:3000 (development)
- http://localhost:3002 (development)
- https://online-book-sharing-system-client.onrender.com (production)

## Support

If issues persist:
1. Check Render logs for both services
2. Verify all environment variables are set
3. Ensure MongoDB Atlas allows connections
4. Check browser console for specific error messages
