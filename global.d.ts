declare module "*.css"
declare module "*"

import mongoose from "mongoose";

declare global {
  var __mongoose_cache:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}