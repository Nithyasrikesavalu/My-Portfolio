import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config(); // fallback to current working directory

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB, isDbConnected } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false })); // CSP is skipped so Google Fonts and the Vite build load; tighten if you host elsewhere.
// Allowed origins for CORS: deployed Vercel frontend, local development hosts, and any configured in CLIENT_ORIGIN
const defaultAllowedOrigins = [
  "https://my-portfolio-jade-seven-49.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowedOriginsSet = new Set([
  ...defaultAllowedOrigins.map((o) => o.replace(/\/+$/, "")),
  ...configuredOrigins,
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, Render health checks)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");

      // Check exact match in configured/default set
      if (allowedOriginsSet.has(normalizedOrigin)) {
        return callback(null, true);
      }

      // Allow any Vercel deployment of this portfolio (e.g. preview branches)
      if (/^https:\/\/my-portfolio.*\.vercel\.app$/.test(normalizedOrigin)) {
        return callback(null, true);
      }

      // Allow localhost in non-production environments
      if (
        process.env.NODE_ENV !== "production" &&
        (normalizedOrigin.includes("localhost") || normalizedOrigin.includes("127.0.0.1"))
      ) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (req, res) => res.json({ ok: true, database: isDbConnected() ? "connected" : "disconnected" }));
app.use("/api/contact", contactRoutes);
app.use("/api", notFound);

// In production, serve the built frontend from the same server.
const dist = path.join(__dirname, "../client/dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.use(errorHandler);

connectDB().finally(() => {
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
});
