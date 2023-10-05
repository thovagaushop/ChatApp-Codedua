import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import {
  ConfligError,
  GoogleEmailNotVerifiedError,
  OtpError,
  ValidationError,
} from "../common/exeptions/custom.exeption.js";
import * as authService from "../services/auth.service.js";
import { generateToken } from "../services/jwt.service.js";
export const login = async (req, res) => {
  try {
    const token = authService.getTokenAfterLogin({
      id: req.user.id,
      username: req.user.username,
    });

    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      accessToken: token,
    });
  } catch (error) {
    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const token = await authService.googleLogin(req.user);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      accessToken: token,
    });
  } catch (error) {
    if (error instanceof GoogleEmailNotVerifiedError) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.GOOGLE_EMAIL_NOT_VERIFIED,
      });
    }

    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      message: MessageConstant.VERIFY_EMAIL,
      data: user,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ConfligError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    } else if (error instanceof ValidationError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    }
    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const result = await authService.verifyEmail(userId, otp);

    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: result,
    });
  } catch (error) {
    if (error instanceof OtpError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    } else if (error instanceof ValidationError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    }

    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const nonAuthenticated = (req, res) => {
  return res.status(HttpStatusConstant.UNAUTHORIZE).json({
    status: StatusResponseConstant.ERROR,
    message: MessageConstant.UNAUTHORIZE,
  });
};

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(HttpStatusConstant.BAD_REQUEST).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.BAD_REQUEST,
      });
    }
    res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      message: MessageConstant.LOGOUT_SUCCESS,
    });
  });
};
