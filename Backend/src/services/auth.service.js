import EnvConstant from "../common/constant/env.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import {
  BadRequestError,
  ConfligError,
  OtpError,
  ValidationError,
} from "../common/exeptions/custom.exeption.js";
import { generateOtp, sendMailOtp } from "../common/otp/index.js";
import { generateToken } from "./jwt.service.js";
import * as userService from "./user.service.js";
import * as otpService from "./otp.service.js";
import * as bcrypt from "bcrypt";

export const getTokenAfterLogin = ({ id, username, avatar }) => {
  try {
    const accessToken = generateToken({
      sub: id,
      username,
      avatar,
    });
    return accessToken;
  } catch (error) {
    console.log("Error when create user : ", error.message);
    throw Error(error.message);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    // validate input
    if (!username || !email)
      throw new ValidationError(MessageConstant.MISSING_FIELD);
    let user = await userService.findOne({ email });
    if (!user) {
      // const salt = bcrypt.genSaltSync(EnvConstant.SALT_ROUND);
      user = await userService.create({
        username,
        email,
        // password: bcrypt.hashSync(password, salt),
      });
    }

    try {
      // Send Email Verify
      const otp = generateOtp();
      await otpService.create({
        user: user.id,
        otp: otp,
        createdAt: Date.now(),
        expiredAt: Date.now() + 300000, // 5 minute
      });
      await sendMailOtp(otp, user.email);
    } catch (error) {
      // Delete user
      await userService.remove(user.id);
      throw error;
    }

    return { id: user.id, email: user.email };
  } catch (error) {
    console.log("Error when register : ", error.message);
    throw error;
  }
};

export const verifyEmail = async (userId, otp) => {
  try {
    if (!userId || !otp)
      throw new ValidationError(MessageConstant.MISSING_FIELD);

    const checkOtp = await otpService.findByUserId(userId);
    if (!checkOtp) throw new OtpError(MessageConstant.INVALID_OTP);

    // Check otp invalid
    if (Date.now() > checkOtp.expiredAt) {
      await userService.remove(userId);
      await otpService.remove(checkOtp.id);
      throw new OtpError(MessageConstant.OTP_EXPIRED);
    } else if (checkOtp.otp !== parseInt(otp)) {
      console.log(otp, parseInt(checkOtp.otp));
      throw new OtpError(MessageConstant.INVALID_OTP);
    }

    let { id, username, avatar, ...userInfo } = await userService.update(
      userId
    );
    await otpService.remove(checkOtp.id);

    return {
      accessToken: getTokenAfterLogin({ id, username, avatar }),
    };
  } catch (error) {
    console.log("Error when verify email : ", error.message);
    throw error;
  }
};

export const googleLogin = async (user) => {
  try {
    // Check email verified
    if (!user["email_verified"])
      throw new GoogleEmailNotVerifiedError(
        MessageConstant.GOOGLE_EMAIL_NOT_VERIFIED
      );

    // Check user existed
    const checkUser = await userService.findOne({ email: user.email });
    if (checkUser) {
      const accessToken = getTokenAfterLogin({
        id: checkUser.id,
        username: checkUser.username,
        avatar: checkUser.avatar,
      });

      return {
        accessToken: accessToken,
      };
    } else {
      const { id, username, avatar, ...newUser } = await userService.create({
        username: user["given_name"] + " " + user["family_name"],
        email: user["email"],
        authProvider: "google",
        providerId: user.sub,
        avatar: user.picture,
        verified: true,
      });
      return {
        accessToken: getTokenAfterLogin({ id, username, avatar }),
      };
    }
  } catch (error) {
    console.log("Error when login by google : ", error.message);
    throw error;
  }
};

export const faceBookLogin = async (user) => {
  try {
    // Check user existed
    const checkUser = await userService.findOne({ providerId: user.id });

    if (checkUser) {
      const accessToken = getTokenAfterLogin({
        id: checkUser.id,
        username: checkUser.username,
        avatarL: checkUser.avatar,
      });

      return {
        accessToken: accessToken,
      };
    } else {
      const { id, username, avatar, ...newUser } = await userService.create({
        username: user["first_name"] + " " + user["last_name"],
        authProvider: "facebook",
        providerId: user.id,
        avatar: user.picture.data.url,
        verified: true,
      });

      return {
        accessToken: getTokenAfterLogin({ id, username, avatar }),
      };
    }
  } catch (error) {
    console.log("Error when login by facebook : ", error.message);
    throw error;
  }
};
