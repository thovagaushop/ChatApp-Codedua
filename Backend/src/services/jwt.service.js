import jwt from "jsonwebtoken";
import EnvConstant from "../common/constant/env.constant.js";

export const generateToken = (payload) => {
  const token = jwt.sign({ payload }, EnvConstant.JWT_SECRET, {
    expiresIn: "300s",
  });

  return token;
};

// export const verifyToken = (token) => {

// }
