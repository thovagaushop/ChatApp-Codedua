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
};

export const update = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, rawResult: false }
    );
    return user;
  } catch (error) {
    console.log("Error when update user : ", error.message);
    throw new BadRequestError(error.message);
  }
};

export const remove = async (id) => {
  try {
    await User.findByIdAndRemove(id);
    return true;
  } catch (error) {
    console.log("Error when remove user : ", error.message);
    throw new BadRequestError(error.message);
  }
};

export const updateProfile = async (newProfile) => {
  try {
    const user = await User.findByIdAndUpdate(id, newProfile, {
      new: true,
      rawResult: false,
    });
    return user;
  } catch (error) {
    console.log("Error when update profile : ", error.message);
    throw new BadRequestError(error.message);
  }
};
