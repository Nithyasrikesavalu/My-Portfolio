# Nithyasri K. – MERN Portfolio

React (Vite) + Tailwind CSS v4 + Framer Motion + Lucide icons frontend with a cosmic dark theme (and a light theme toggle), Express + MongoDB (Mongoose) backend for the contact form and API health checks.

## Live Deployments
- **Live Portfolio (Vercel):** [https://my-portfolio-jade-seven-49.vercel.app/](https://my-portfolio-jade-seven-49.vercel.app/)
- **Backend API (Render):** [https://my-portfolio-0os5.onrender.com](https://my-portfolio-0os5.onrender.com)
  - Health check: [https://my-portfolio-0os5.onrender.com/api/health](https://my-portfolio-0os5.onrender.com/api/health)
  - Contact endpoint: `POST https://my-portfolio-0os5.onrender.com/api/contact`
- **GitHub Repository:** [https://github.com/Nithyasrikesavalu/My-Portfolio](https://github.com/Nithyasrikesavalu/My-Portfolio)

```
client/   React single-page site (sections: home, about, skills, design, projects, education, contact)
server/   Express API: POST /api/contact, GET /api/health
```

## Requirements
Node.js 18 or newer, npm, and a MongoDB database (local or MongoDB Atlas) if you want the contact form to work.

## Setup
```bash
npm run install:all          # installs root, client and server dependencies
cp server/.env.example server/.env
cp client/.env.example client/.env   # sets VITE_API_URL to Render backend or leave empty for local proxy
```
Edit `server/.env` and verify `MONGODB_URI` and `CLIENT_ORIGIN`.

## Run in development
```bash
npm run dev
```
Frontend: http://localhost:5173 (it proxies `/api` to the server). API: http://localhost:3000 (or PORT).

## Production
```bash
npm run build     # builds client/dist
npm start         # Express serves the API and the built site on PORT (default 5000)
```

### Cloud Deployments

#### 1. Frontend (Vercel)
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_URL`: `https://my-portfolio-0os5.onrender.com`

#### 2. Backend (Render)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Environment Variables:**
  - `NODE_ENV`: `production`
  - `PORT`: `10000` (assigned by Render)
  - `MONGO_URI`: `mongodb+srv://...`
  - `CLIENT_ORIGIN`: `https://my-portfolio-jade-seven-49.vercel.app`
  - `SMTP_USER` / `SMTP_PASS` / `NOTIFY_TO`: (for Gmail notifications)

## Editing content
- `client/src/data/projects.js`: projects. Supports `liveLink`, `apiLink`, `githubLink`, tags, features, and descriptions.
- `client/src/data/site.js`: name, location, GitHub, LinkedIn, email, livePortfolio, backendApi, portfolioRepo.

## Interactions
- **Custom cursor** (`components/Cursor.jsx`): dot plus eased ring, enlarges over links and buttons, shows an "Explore" label over project previews, and steps aside over form fields where the native text cursor is used.
- **Hero glow**: a violet and sky radial gradient that follows the pointer with easing (rAF loop, no React re-renders).
- **Magnetic buttons**, **tilting portrait and project cards**: mouse only, clamped to small movements, disabled for reduced motion.
- **Theme**: dark (default) and light, switched from the navbar and saved in localStorage. Dark palette: #17051F, #260936, #080A12, #A855F7, #FFD629.

## Contact form behaviour
- The browser shows success only after the server returns a 2xx response with `success: true`.
- The server validates input, rate-limits (10 per 15 minutes per IP) and stores the message in MongoDB.
- If MongoDB is unreachable, the API returns 503 and the form shows an error.
- Email alert: uses `SMTP_*` and `NOTIFY_TO` in `server/.env`.
