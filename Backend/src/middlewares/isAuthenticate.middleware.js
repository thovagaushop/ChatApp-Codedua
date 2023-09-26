import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";

const isAuthenticateMiddleware = (req, res, next) => {
  if (!req.user || !req.isAuthenticated()) {
    return res.status(HttpStatusConstant.UNAUTHORIZE).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.UNAUTHORIZE,
    });
  }
  next();
};

export default isAuthenticateMiddleware;
