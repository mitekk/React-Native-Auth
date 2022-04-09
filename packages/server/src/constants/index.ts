import dotenv from "dotenv";
dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN!;
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN!;
export const DB_NAME = process.env.DATABASE_NAME;
export const DB_TYPE = process.env.DATABASE_TYPE;
export const DB_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
