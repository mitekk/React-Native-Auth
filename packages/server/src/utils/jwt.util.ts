import jwt from "jsonwebtoken";
import { jwt_secret } from "../constants";

const expiresInAccessToken = "15m";
const expiresInRefreshToken = "7d";
//: { errors: { message: string }[] }
const JwtUtil = {
  sign: (id: string = "0", refreshTokenId?: string) =>
    jwt.sign({ id, refreshTokenId }, jwt_secret, {
      expiresIn: expiresInAccessToken,
    }),
  signRefreshToken: (id: string) =>
    jwt.sign({ id }, jwt_secret, {
      expiresIn: expiresInRefreshToken,
    }),
  verify: (token: string) => {
    try {
      return jwt.verify(token, jwt_secret);
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
};

export default JwtUtil;
