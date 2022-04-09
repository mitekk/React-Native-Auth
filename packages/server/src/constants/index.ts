import dotenv from "dotenv";
dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN!;
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN!;
