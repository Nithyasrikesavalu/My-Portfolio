import dns from "node:dns";
import mongoose from "mongoose";

export const isDbConnected = () => mongoose.connection.readyState === 1;

// Connection event handlers for runtime monitoring and error logging
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connection established.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB connection lost. Disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB connection reconnected.");
});

export async function connectDB(retries = 3) {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGODB_URI / MONGO_URI is not set. The server will run, but messages will not be saved to DB.");
    return false;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // On retry 2, if system DNS had issues, try Google DNS fallback
      if (attempt === 2) {
        try {
          dns.setServers(["8.8.8.8", "1.1.1.1"]);
        } catch {
          // Ignore if restricted
        }
      }

      await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
      console.log("✅ MongoDB connected successfully!");
      return true;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, err.message);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  console.warn("⚠️ MongoDB offline. The server will continue running and dispatch contact enquiries via email.");
  return false;
}
