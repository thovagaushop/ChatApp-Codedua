import { BadRequestError } from "../common/exeptions/custom.exeption.js";
import User from "../models/user.model.js";

export const create = async (user) => {
  try {
    const result = await User.create(user);
    return result;
  } catch (error) {
    console.log("Error when create user : ", error.message);
    throw new BadRequestError(error.message);
  }
};

export const findOne = async (data) => {
  try {
    const result = await User.findOne(data);
    return result;
  } catch (error) {
    console.log("Error when find user : ", error.message);
    throw new BadRequestError(error.message);
  }
};

export const findById = async (id) => {
  try {
    const result = await User.findById(id);
    return result;
  } catch (error) {
    console.log("Error when find user by id : ", error.message);
    throw new BadRequestError(error.message);
  }
}
