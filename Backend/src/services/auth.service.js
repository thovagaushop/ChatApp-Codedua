import EnvConstant from "../common/constant/env.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import {
  BadRequestError,
  ConfligError,
} from "../common/exeptions/custom.exeption.js";
import * as userService from "./user.service.js";
import * as bcrypt from "bcrypt";

export const login = async ({ email, password }) => {
  try {
    // const result = await User.create(user);

    return user;
  } catch (error) {
    console.log("Error when create user : ", error.message);
    throw Error(error.message);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const user = await userService.findOne({ email });
    if (user) throw new ConfligError(MessageConstant.EMAIL_EXISTED);
    else {
      const salt = bcrypt.genSaltSync(EnvConstant.SALT_ROUND);
      const newUser = await userService.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      });
      return newUser;
    }
  } catch (error) {
    console.log("Error when register : ", error.message);
    throw error;
  }
};
