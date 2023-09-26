import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import passport from "../config/passport.config.js";
import jwt from "jsonwebtoken";

const jwtauthenticateMiddleware = (req, res, next) => {
  passport.authenticate("jwt", (info, user, err) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.TOKEN_EXPIRED,
      });
    } else if (err)
      return res.status(HttpStatusConstant.INTERNAL_SERVER_ERROR).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.INTERNAL_SERVER_ERROR,
      });

    if (!user)
      return res.status(HttpStatusConstant.UNAUTHORIZE).json({
        status: StatusResponseConstant.ERROR,
        message: MessageConstant.LOGIN_FAILED,
      });
    else {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(HttpStatusConstant.INTERNAL_SERVER_ERROR).json({
            status: StatusResponseConstant.ERROR,
            message: MessageConstant.INTERNAL_SERVER_ERROR,
          });
        }
        next();
      });
    }
  })(req, res, next);
};

export default jwtauthenticateMiddleware;
