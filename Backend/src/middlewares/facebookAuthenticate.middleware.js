import axios from "axios";
import EnvConstant from "../common/constant/env.constant.js";
import { ValidationError } from "../common/exeptions/custom.exeption.js";
import { validateMissingField } from "../common/validations/index.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import HttpStatusConstant from "../common/constant/httpstatus.constant.js";

export const facebookAuthenticateMiddleware = async (req, res, next) => {
  try {
    const facebookToken = req.body.accessToken;
    // Validate input
    validateMissingField({ facebookToken: facebookToken });

    const response = await axios.get(
      `${EnvConstant.FACEBOOK_API_URL}${facebookToken}`
    );

    const userInfo = response?.data;

    if (userInfo) {
      req.user = userInfo;
      next();
    } else {
      throw Error(MessageConstant.LOGIN_FAILED);
    }
  } catch (error) {
    console.log(error.message);
    // Catch Error Token expired
    if (error instanceof ValidationError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    }
    return res.status(HttpStatusConstant.UNAUTHORIZE).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.UNAUTHORIZE,
    });
  }
};
