# Nithyasri K. – MERN Portfolio

React (Vite) + Tailwind CSS v4 + Framer Motion + Lucide icons frontend with a cosmic dark theme (and a light theme toggle), Express + MongoDB (Mongoose) backend for the optional contact form.

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
cp client/.env.example client/.env   # optional, can stay empty
```
Edit `server/.env` and set `MONGODB_URI`.

## Run in development
```bash
npm run dev
```
Frontend: http://localhost:5173 (it proxies `/api` to the server). API: http://localhost:5000.

## Production
```bash
npm run build     # builds client/dist
npm start         # Express serves the API and the built site on PORT (default 5000)
```
If the frontend and API are hosted on different domains, set `VITE_API_URL` (client) before building and `CLIENT_ORIGIN` (server).

## Editing content
- `client/src/data/projects.js`: projects. Leave `liveLink` / `githubLink` as `""` until a real URL exists; the UI then shows "coming soon".
- `client/src/data/site.js`: name, location, GitHub, LinkedIn, email.

## Your images
The original images were not available when this project was assembled, so labelled placeholders are shown. Add your real files under `client/src/assets/` using the names in `client/src/assets/README.md` (see the table in that file). They are picked up automatically. The About "Download Resume" button shows as disabled until the resume file exists.

## Interactions
- **Custom cursor** (`components/Cursor.jsx`): dot plus eased ring, enlarges over links and buttons, shows an "Explore" label over project previews, and steps aside over form fields where the native text cursor is used. It is not enabled on touch devices or when the OS asks for reduced motion.
- **Hero glow**: a violet and sky radial gradient that follows the pointer with easing (rAF loop, no React re-renders).
- **Magnetic buttons**, **tilting portrait and project cards**: mouse only, clamped to small movements, disabled for reduced motion.
- The custom cursor also switches off below 768px wide, and back on if the window is widened.
- The portrait does not track the cursor with its eyes: that would need separate face and eye image layers. It tilts, parallaxes and is lit as one photo.
- Theme: dark (default) and light, switched from the navbar and saved in localStorage. All colours are CSS variables at the top of `client/src/index.css`. Dark palette: #17051F, #260936, #080A12, #A855F7, #FFD629.

## Contact form behaviour
- The browser shows success only after the server returns a 2xx response with `success: true`.
- The server validates input, rate-limits (10 per 15 minutes per IP) and stores the message in MongoDB.
- If MongoDB is not configured or unreachable, the API returns 503 and the form shows an error. Nothing is faked.
- Optional email alert: fill `SMTP_*` and `NOTIFY_TO` in `server/.env` (for Gmail use an App Password). An email failure is logged but does not fail a message that was already stored.

## Notes
- The backend in this repo is new: the original backend was not available, so `/api/contact` follows the contract the old frontend used (`POST`, JSON `{name,email,message}`, response `{success, message}`). If your original server stores data differently, merge accordingly.
- Dependency versions are caret ranges (React 18, Vite 6, Tailwind 4). `npm install` will generate a lock file.
- No linting or automated tests are configured.

- Design tools: Figma uses the Figma icon from react-icons; Adobe XD, Illustrator and Photoshop are shown as the familiar two-letter app tiles in each app's colours, not as official logo files.
- Bootstrap and VS Code (from your earlier tech stack) are kept in the Tools card. Delete them in `client/src/pages/TechStack.jsx` if you don't want them.
