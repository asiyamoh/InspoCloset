# Environment Configuration Guide

This project supports multiple environments with proper configuration management.

## Environment Files

### Backend (API)
Create these files in the `api/` directory:

- `.env` - Development environment (local)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

### Frontend
Create these files in the root directory:

- `.env` - Development environment (local)
- `.env.staging` - Staging environment  
- `.env.production` - Production environment

## Environment Variables

### Backend Variables
```bash
NODE_ENV=development|staging|production
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
PORT=8080
API_URL=https://...
```

### Frontend Variables (must be prefixed with VITE_)
```bash
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=https://...
```

## Running Different Environments

### Development
```bash
# Backend
cd api
npm run dev

# Frontend
npm run dev
```

### Staging
```bash
# Backend
cd api
npm run start:staging

# Frontend
npm run dev:staging
```

### Production
```bash
# Backend
cd api
npm run start:prod

# Frontend
npm run build:prod
```

## Environment Detection

The application automatically detects the environment based on:
- `NODE_ENV` environment variable
- URL patterns (localhost = development, staging = staging, else = production)

## Configuration Service

Both frontend and backend use centralized configuration services:
- Backend: `AppConfigService` in `src/config/app.config.service.ts`
- Frontend: `appConfig` in `src/config/app.config.ts`

## Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use `.env.example` files** - Document required variables
3. **Validate environment variables** - Both services validate required vars
4. **Use environment-specific CORS** - Configured automatically
5. **Environment-specific logging** - Different log levels per environment

## Deployment

### Staging
1. Set `NODE_ENV=staging`
2. Use staging environment files
3. Deploy to staging infrastructure

### Production
1. Set `NODE_ENV=production`
2. Use production environment files
3. Deploy to production infrastructure

## Troubleshooting

### Missing Environment Variables
- Check that `.env` files exist
- Verify variable names match exactly
- Ensure `VITE_` prefix for frontend variables

### Wrong Environment Detection
- Check `NODE_ENV` is set correctly
- Verify URL patterns match expected domains
- Check configuration service logs
