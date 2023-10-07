import Otp from "../models/otp.model.js";

export const create = async (otp) => {
  try {
    const newOtp = await Otp.create(otp);
    return otp;
  } catch (error) {
    console.log("Error when create otp : ", error.message);
    throw error;
  }
};

export const findByUserId = async (userId) => {
  try {
    const otp = await Otp.findOne({ user: userId });
    return otp;
  } catch (error) {
    console.log("Error when find otp by userid : ", error.message);
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await Otp.findByIdAndRemove(id);
    return true;
  } catch (error) {
    console.log("Error when remove otp : ", error.message);
    throw error;
  }
};
