import mongoose from "mongoose";
import { MONGODB_URL } from "@/config";

// Cache the connection across hot reloads in Next.js dev mode
let cached = (global as any).__mongoose_cache;

if (!cached) {
  cached = (global as any).__mongoose_cache = { conn: null, promise: null };
}

export const connectDB = async (): Promise<boolean> => {
  const databaseUrl = MONGODB_URL;

  if (!databaseUrl) {
    console.error("MONGODB_URL is not defined in configuration.");
    return false;
  }

  // Return existing connection if already connected
  if (cached.conn) {
    return true;
  }

  // Reuse in-flight promise if a connection is already being established
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(databaseUrl, {
        bufferCommands: false,    // disable buffering so we get errors immediately
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((m) => m)
      .catch((err) => {
        cached.promise = null;   // reset so next call retries
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return true;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return false;
  }
};