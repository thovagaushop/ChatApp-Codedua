import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import * as userService from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
}
