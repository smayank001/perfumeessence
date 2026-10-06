/**
 * Centralized Application Configuration
 * Contains all configuration values and credentials formerly stored in .env.local
 */

export const config = {
  // MongoDB Connection URL
  MONGODB_URL:
    (typeof process !== "undefined" && process.env?.MONGODB_URL) ||
    "mongodb+srv://theperfumeessence_db_user:JfVrZe2SPcZhzw6u@cluster0.9y7syba.mongodb.net/zevora?appName=Cluster0",

  // Base Application URL
  NEXT_PUBLIC_BASE_URL:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_URL) ||
    "http://localhost:3000",

  // JWT Token Secret for Authentication
  TOKEN_SECRET:
    (typeof process !== "undefined" && process.env?.TOKEN_SECRET) ||
    "2c80a5f3-9342-4ef3-b9bf-7d564c6e2a11-190c7696-aea5-4207-b93a-1f3e9ab5e68b",

  // Cloudinary Image / Video Upload Configuration
  CLOUDINARY_CLOUD_NAME:
    (typeof process !== "undefined" && process.env?.CLOUDINARY_CLOUD_NAME) ||
    "qr8rhdcm",
  CLOUDINARY_API_KEY:
    (typeof process !== "undefined" && process.env?.CLOUDINARY_API_KEY) ||
    "587125134712718",
  CLOUDINARY_API_SECRET:
    (typeof process !== "undefined" && process.env?.CLOUDINARY_API_SECRET) ||
    "OlA48N_PZAiluDKP_IV8oNNkIRM",

  // Nodemailer / Email Service Credentials
  EMAIL_USER:
    (typeof process !== "undefined" && process.env?.EMAIL_USER) || "",
  EMAIL_APP_PASSWORD:
    (typeof process !== "undefined" && process.env?.EMAIL_APP_PASSWORD) || "",

  // Meta Pixel Tracking ID
  NEXT_PUBLIC_META_PIXEL_ID:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_META_PIXEL_ID) || "",

  // Node Environment
  NODE_ENV:
    (typeof process !== "undefined" && process.env?.NODE_ENV) || "development",
};

// Export individual named constants for convenience
export const {
  MONGODB_URL,
  NEXT_PUBLIC_BASE_URL,
  TOKEN_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  EMAIL_USER,
  EMAIL_APP_PASSWORD,
  NEXT_PUBLIC_META_PIXEL_ID,
  NODE_ENV,
} = config;

export default config;
