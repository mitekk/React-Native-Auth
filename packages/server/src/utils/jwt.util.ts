import jwt, { DecodeOptions } from "jsonwebtoken";
import {
  JWT_SECRET_REFRESH_SECRET,
  JWT_SECRET_ACCESS_SECRET,
  JWT_SECRET_RESET_SECRET,
  JWT_SECRET_VERIFY_SECRET,
} from "../constants";

export enum TokenType {
  AccessToken = "15s",
  RefreshToken = "7d",
  ResetPassword = "1h",
  VerifyEmail = "1h",
}

const secret = {
  [TokenType.AccessToken]: JWT_SECRET_ACCESS_SECRET,
  [TokenType.RefreshToken]: JWT_SECRET_REFRESH_SECRET,
  [TokenType.ResetPassword]: JWT_SECRET_RESET_SECRET,
  [TokenType.VerifyEmail]: JWT_SECRET_VERIFY_SECRET,
};

type SignData = {
  userId: string;
  refreshTokenId?: string;
};

const JwtUtil = {
  sign: (data: SignData, tokenType: TokenType) =>
    jwt.sign(data, secret[tokenType], {
      expiresIn: tokenType,
    }),
  verify: (token: string, tokenType: TokenType) => {
    try {
      return jwt.verify(token, secret[tokenType]) as jwt.JwtPayload;
    } catch ({ name, message }) {
      return {
        errors: [
          {
            name,
            message,
          },
        ],
      };
    }
  },
  decode: (token: string, options?: DecodeOptions) => {
    const decoded = jwt.decode(token, options);
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
