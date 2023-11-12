import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import ChatRoom from "../models/chatRoom.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  const { message, chatRoomId } = req.body;

  if (!message || !chatRoomId) {
    return res.status(403).json({
      status: StatusResponseConstant.ERROR,
      msg: "Invalid data request",
    });
  }

  const newMessage = {
    sender: req.user.id,
    message,
    chatRoom: chatRoomId,
  };

  try {
    let msg = await Message.create(newMessage);
    msg = await msg.populate("sender", "username avatar");
    msg = await msg.populate("chatRoom");
    msg = await User.populate(msg, {
      path: "chatRoom.users",
      select: "username avatar",
    });

    await ChatRoom.findByIdAndUpdate(chatRoomId, {
      lastestMessage: msg.id,
    });

    return res.status(200).json({
      status: StatusResponseConstant.SUCCESS,
      data: msg,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: StatusResponseConstant.ERROR,
      msg: error.message,
    });
  }
};

export const listMessageByRoomId = async (req, res) => {
  try {
    const messages = await Message.find({ chatRoom: req.params.chatRoomId })
      .populate("sender", "username avatar")
      .populate("chatRoom");
    return res.status(200).json({
      status: StatusResponseConstant.SUCCESS,
      data: messages,
    });
  } catch (error) {
    return res.status(403).json({
      status: StatusResponseConstant.ERROR,
      msg: error.message,
    });
  }
};
