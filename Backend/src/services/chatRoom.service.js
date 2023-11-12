import ChatRoom from "../models/chatRoom.model.js";
import { BadRequestError } from "../common/exeptions/custom.exeption.js";
import MessageConstant from "../common/constant/message.constant.js";

export const create = async (chat) => {
  try {
    const newChat = await ChatRoom.create(chat);
    return newChat;
  } catch (error) {
    throw new BadRequestError(MessageConstant.BAD_REQUEST);
  }
};

export const findById = async (id) => {
  try {
    const chat = await ChatRoom.findById(id).populate("users").exec();
    return chat;
  } catch (error) {
    console.log(error);
    throw new BadRequestError(MessageConstant.BAD_REQUEST);
  }
};

export const findOne = () => {};

export const findByUserId = async (userId) => {
  try {
    const listChat = await ChatRoom.find({ users: userId });
    console.log(listChat);
    return listChat;
  } catch (error) {
    throw new BadRequestError(MessageConstant.BAD_REQUEST);
  }
};

export const update = () => {};

export const remove = () => {};
