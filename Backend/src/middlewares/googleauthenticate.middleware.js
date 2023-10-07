import axios from "axios";
import jwt from "jsonwebtoken";
import EnvConstant from "../common/constant/env.constant.js";
import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import { validateMissingField } from "../common/validations/index.js";
import { ValidationError } from "../common/exeptions/custom.exeption.js";

const getPublicKeysOfGoogle = async () => {
  try {
    const { data: publicKeys } = await axios.get(EnvConstant.GOOGLE_CERT_URL);
    return publicKeys;
  } catch (error) {
    return null;
  }
};

export const googleauthenticateMiddleware = async (req, res, next) => {
  try {
    const googleToken = req.body.accessToken;
    // Validate
    validateMissingField({ googleToken: googleToken });

    const publicKeys = await getPublicKeysOfGoogle();

    if (!publicKeys) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.INVALID_TOKEN,
      });
    }

    // Decode google token to get the 'kid' and header
    const decodedToken = jwt.decode(googleToken, { complete: true });

    if (!decodedToken || !decodedToken.header) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.INVALID_TOKEN,
      });
    }

    const kid = decodedToken.header.kid;

    // Find public key for kid from google cert
    const publicKey = publicKeys[kid];
    if (!publicKey) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.INVALID_TOKEN,
      });
    }

    const userInfo = jwt.verify(googleToken, publicKey, {
      algorithms: ["RS256"],
    });

    req.user = userInfo;
    next();
  } catch (error) {
    console.log(error);
    // Catch Error Token expired
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.TOKEN_EXPIRED,
      });
    } else if (error instanceof ValidationError) {
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
