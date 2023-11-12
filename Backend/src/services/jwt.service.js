import jwt from "jsonwebtoken";
import EnvConstant from "../common/constant/env.constant.js";

export const generateToken = (payload) => {
  const token = jwt.sign({ payload }, EnvConstant.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyToken = (token) => {
  try {
    const credentials = jwt.verify(token, ENV.JWT_SECRET);
    return credentials;
  } catch (error) {
    return null;
  }
};
