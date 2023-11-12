import * as chatService from "../services/chatRoom.service.js";
import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";

export const create = async (req, res) => {
  try {
    const chat = await chatService.create(req.body);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: chat,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const list = async (req, res) => {
  try {
  } catch (error) {}
};

export const findById = async (req, res) => {
  try {
    const chat = await chatService.findById(req.params.id);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: chat,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const findByUserId = async (req, res) => {
  try {
    console.log(req.params.userId);
    const listChat = await chatService.findByUserId(req.params.userId);

    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: listChat,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};
