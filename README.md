# AI Resume Generator — Docker-ready

## Main fixes
- Added a real `backend/server.js` (the old file was commented out).
- Docker uses Node 22, matching `package.json`.
- Docker installs Chromium and all required runtime libraries for Puppeteer.
- Resume creation accepts JSON or multipart `content`.
- Template loader accepts both `professional1` and `professional1.js`.
- Resume update parses multipart JSON correctly and regenerates the PDF.
- Frontend Vite build/start scripts are valid.
- Added Docker + Nginx setup for frontend and backend.

## Required environment variables
Copy `backend/.env.example` to `backend/.env` and fill:
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Set `FRONTEND_URL` to the URL where the frontend is running.

## Docker
From the project root:

```bash
docker compose build
docker compose up
```

Frontend: http://localhost:8080  
Backend: http://localhost:5000

## Important
The database must contain active Template documents whose `slug`, `category`, and `htmlFile`
match files under:

`backend/templates/resumeAllTemplates/<category>/<htmlFile>.js`

Example:

```json
{
  "name": "Simple Resume 1",
  "slug": "simple1",
  "category": "simple",
  "htmlFile": "simple1",
  "isActive": true
}
```

The frontend only needs to send `templateSlug: "simple1"`.

## Render without Docker
Backend:
- Root Directory: `backend`
- Build Command: `npm ci && npx puppeteer browsers install chrome`
- Start Command: `npm start`

Frontend:
- Root Directory: `frontend`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
