import jwt from "jsonwebtoken";
import { jwt_secret } from "../constants";

const expiresIn = "10m";
//: { errors: { message: string }[] }
const JwtUtil = {
  sign: (id: string = "0", refreshTokenId?: string) =>
    jwt.sign({ id, refreshTokenId }, jwt_secret, {
      expiresIn,
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
