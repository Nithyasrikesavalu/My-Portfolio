import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB, isDbConnected } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false })); // CSP is skipped so Google Fonts and the Vite build load; tighten if you host elsewhere.
const defaultDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const configuredOrigins = (process.env.CLIENT_ORIGIN || "").split(",").map((o) => o.trim()).filter(Boolean);
const origins = configuredOrigins.length ? configuredOrigins : (process.env.NODE_ENV === "production" ? false : defaultDevOrigins);
app.use(cors({ origin: origins }));
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
