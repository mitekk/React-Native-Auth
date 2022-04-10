import jwt from "jsonwebtoken";
import {
  JWT_SECRET_REFRESH_TOKEN,
  JWT_SECRET_ACCESS_TOKEN,
} from "../constants";

const expiresInAccessToken = "15s";
const expiresInRefreshToken = "7d";

const JwtUtil = {
  sign: (id: string = "0", refreshTokenId?: string) =>
    jwt.sign({ id, refreshTokenId }, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: expiresInAccessToken,
    }),
  verify: (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET_ACCESS_TOKEN) as jwt.JwtPayload;
    } catch ({ name }) {
      return {
        errors: [
          {
            message: name,
          },
        ],
      };
    }
  },
  signRefreshToken: (id: string) =>
    jwt.sign({ id }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: expiresInRefreshToken,
    }),

  verifyRefreshToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET_REFRESH_TOKEN) as jwt.JwtPayload;
    } catch ({ name }) {
      return {
        errors: [
          {
            message: name,
          },
        ],
      };
    }
  },
  decode: (token: string) => {
    const decoded = jwt.decode(token);
    if (typeof decoded === "string" || typeof decoded === null) {
      return {
        errors: [
          {
            message: "failed to decode token",
          },
        ],
      };
    }

    return decoded;
  },
};

export default JwtUtil;
