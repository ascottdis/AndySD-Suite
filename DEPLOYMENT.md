# Deployment Guide for AndySD Suite

## Overview

This guide covers deploying individual apps from the monorepo to various platforms.

**Key Principle:** Each app is **independent** and deployed separately with its own environment variables and database (if needed).

---

## 📋 Pre-Deployment Checklist

- [ ] All tests pass: `pnpm lint:db && pnpm build`
- [ ] Environment variables documented in `.env.example`
- [ ] Database migrations applied (if using `@andysd/db`)
- [ ] Docker images built and tested locally
- [ ] Secrets configured in deployment platform
- [ ] CI/CD pipeline passes

---

## 🚀 Deployment Options

### Option 1: Docker (Recommended for Production)

Build and deploy containerized apps. Works with any cloud provider (AWS, GCP, Azure, DigitalOcean, Render, etc.).

#### Build Docker Images

```bash
# Build giggin-api
docker build -t andysd/giggin-api:latest -f Dockerfile.nodejs \
  --build-arg BUILDKIT_INLINE_CACHE=1 .

# Build ariadne-api
docker build -t andysd/ariadne-api:latest -f Dockerfile.nodejs \
  --build-arg TARGET_APP=ariadne-api .

# Build labs-hub (Next.js)
docker build -t andysd/labs-hub:latest -f Dockerfile.nextjs .
```

#### Run Locally with Docker Compose

```bash
# Start all services (API, database, Next.js)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Push to Docker Registry

```bash
# Login to Docker Hub (or your registry)
docker login

# Tag and push
docker tag andysd/giggin-api:latest <your-registry>/giggin-api:latest
docker push <your-registry>/giggin-api:latest
```

#### Deploy to Render.com (Free Tier)

1. Create new **Web Service** in Render dashboard
2. Connect GitHub repo
3. Configure build command:
   ```bash
   pnpm install && pnpm --filter @andysd/giggin-api build
   ```
4. Configure start command:
   ```bash
   pnpm --filter @andysd/giggin-api start
   ```
5. Set environment variables:
   - `GIGGIN_DATABASE_URL` = your PostgreSQL connection string
   - `JWT_SECRET` = a secure random string
   - `NODE_ENV` = production
6. Deploy

#### Deploy to Railway.app

1. Create new project in Railway
2. Connect GitHub repo
3. Add PostgreSQL plugin (Railway → Plugins → PostgreSQL)
4. Copy `GIGGIN_DATABASE_URL` from PostgreSQL plugin variables
5. Configure variables:
   - `GIGGIN_DATABASE_URL` (auto-filled from PostgreSQL)
   - `JWT_SECRET`
   - `NODE_ENV=production`
6. Set build command: `pnpm install && pnpm --filter @andysd/giggin-api build`
7. Set start command: `pnpm --filter @andysd/giggin-api start`
8. Deploy

#### Deploy to AWS ECS / Fargate

1. Push Docker image to AWS ECR:
   ```bash
   aws ecr get-login-password | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   docker tag andysd/giggin-api:latest <account-id>.dkr.ecr.<region>.amazonaws.com/giggin-api:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/giggin-api:latest
   ```
2. Create ECS Task Definition with the image
3. Create ECS Service pointing to the task definition
4. Configure RDS PostgreSQL database
5. Set environment variables in task definition:
   - `GIGGIN_DATABASE_URL` = RDS endpoint
   - `JWT_SECRET` = AWS Secrets Manager secret
   - `NODE_ENV=production`

---

### Option 2: Vercel (For Next.js Apps Only)

Deploy `labs-hub` and `giggin-app` to Vercel.

#### Deploy labs-hub

1. **Push to GitHub** (if not already)
2. **Create Vercel account** and connect GitHub
3. **New Project → Import Git Repository**
4. Select the `andysd-suite` repo
5. **Configure Project:**
   - Root Directory: `apps/labs-hub`
   - Build Command: `pnpm install && pnpm --filter labs-hub build`
   - Output Directory: `.next`
6. **Environment Variables:** (none required for labs-hub; it has no backend DB)
7. **Deploy**

#### Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records to point to Vercel

---

### Option 3: Heroku (Deprecated, but still available)

**Note:** Heroku free tier ended. Consider Render or Railway instead.

If you prefer Heroku:
1. Create `Procfile` in app directory:
   ```
   web: pnpm --filter @andysd/giggin-api start
   ```
2. Create `heroku.yml` in repo root for multi-app support
3. Push to Heroku Git: `git push heroku main`

---

## 🔐 Environment Variables for Production

### Giggin API (`@andysd/giggin-api`)

| Variable | Example | Notes |
|----------|---------|-------|
| `GIGGIN_DATABASE_URL` | `postgresql://user:pass@host:5432/giggin` | **Required.** PostgreSQL connection string. Use app-scoped variable to avoid conflicts. |
| `JWT_SECRET` | `your-secure-random-string` | **Required.** Use a strong random string (64+ chars). Generate: `openssl rand -base64 32` |
| `NODE_ENV` | `production` | Set to `production` for optimizations |
| `PORT` | `3001` | Optional; defaults to 3001 |

### Ariadne API

| Variable | Example | Notes |
|----------|---------|-------|
| `PORT` | `3004` | Optional; defaults to 3004 |
| `NODE_ENV` | `production` | Optional |

### Labs Hub (Next.js)

No environment variables required for the app itself. Optional:

| Variable | Example | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.example.com` | If connecting to backend APIs |

---

## 🗄️ Database Setup

### PostgreSQL (Production)

1. **Create a PostgreSQL database** (AWS RDS, Railway, Render, DigitalOcean, etc.)
2. **Get the connection string** (looks like: `postgresql://user:pass@host:5432/db`)
3. **Set `GIGGIN_DATABASE_URL`** in deployment environment
4. **Run migrations:**
   ```bash
   export DRIZZLE_DATABASE_URL=postgresql://...
   pnpm --filter @andysd/db run db:push
   ```
5. **Test connection:**
   ```bash
   psql postgresql://user:pass@host:5432/db -c "SELECT version();"
   ```

### Local Development with Docker Compose

```bash
# Start database
docker-compose up postgres -d

# Apply schema
export DRIZZLE_DATABASE_URL=postgresql://andysd:dev-password-change-in-prod@localhost:5432/giggin_db
pnpm --filter @andysd/db run db:push
```

---

## 🚢 CI/CD: Automated Deployment

### GitHub Actions to Docker Registry (Optional)

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Docker Registry

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push giggin-api
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./Dockerfile.nodejs
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/giggin-api:latest,${{ secrets.DOCKER_USERNAME }}/giggin-api:${{ github.sha }}
      
      - name: Build and push labs-hub
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./Dockerfile.nextjs
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/labs-hub:latest,${{ secrets.DOCKER_USERNAME }}/labs-hub:${{ github.sha }}
```

Then add GitHub Secrets:
- `DOCKER_USERNAME` = your Docker Hub username
- `DOCKER_PASSWORD` = your Docker Hub access token

---

## 📊 Monitoring & Logging

### For Render / Railway / Vercel

- Built-in logs available in dashboard
- Set up alerts for errors

### For Docker / Self-Hosted

Use logging services:
- **Datadog**, **New Relic**, **Sentry** for error tracking
- **ELK Stack** or **Loki** for log aggregation

---

## 🔄 Rollback & Recovery

1. **Keep previous Docker image tags:**
   ```bash
   docker tag andysd/giggin-api:previous-working-version andysd/giggin-api:v1.0.0
   docker push andysd/giggin-api:v1.0.0
   ```

2. **Quick rollback** (redeploy previous version):
   - Render/Railway/AWS: update service to use previous image tag or commit
   - Vercel: revert to previous deployment from dashboard

3. **Database rollback** (if migrations broke):
   - Keep database backups
   - Restore from backup or use Drizzle migration reversals

---

## 📝 Health Checks

Each app exposes a health endpoint:

```bash
# Ariadne API
curl http://localhost:3004/health
# { "status": "healthy", "app": "ariadne-api" }

# Giggin API
curl http://localhost:3001/health
# { "status": "ok", "timestamp": "2025-12-09T..." }

# Labs Hub (Next.js)
curl http://localhost:3000/
# Returns HTML
```

Configure health checks in your deployment platform (Render, Railway, AWS, etc.) to monitor app status.

---

## 🎯 Deployment Checklist (Per App)

### Before Deploying

- [ ] Commit and push all changes
- [ ] All CI checks pass (GitHub Actions)
- [ ] Code review approved
- [ ] Environment variables documented
- [ ] Database migrations tested locally
- [ ] Secrets configured in deployment platform

### Deploy

- [ ] Trigger deployment (push to `main`, or manual trigger in CI/CD)
- [ ] Verify build succeeds
- [ ] Check health endpoint responds
- [ ] Test key features
- [ ] Monitor logs for errors

### Post-Deploy

- [ ] Verify app is accessible
- [ ] Run smoke tests
- [ ] Monitor error rates (Sentry, etc.)
- [ ] Check database logs
- [ ] Alert team of successful deployment

---

## 🆘 Troubleshooting Deployments

**App won't start:**
- Check environment variables are set correctly
- Check database is accessible (test connection string)
- Review logs for error messages

**Database migrations fail:**
- Ensure `DRIZZLE_DATABASE_URL` is set
- Run migrations locally first to test
- Check database user has correct permissions

**Port conflicts:**
- Docker containers use isolated networks; shouldn't conflict
- If using VMs, ensure ports are free on host

**Out of memory:**
- Next.js builds are memory-intensive
- Increase container memory limit
- Use multi-stage Docker builds (already done in Dockerfile.nextjs)

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app/
- **Vercel Docs:** https://vercel.com/docs
- **Docker Docs:** https://docs.docker.com/
- **Drizzle Migrations:** https://orm.drizzle.team/docs/migrations

---

**Last updated:** December 9, 2025
