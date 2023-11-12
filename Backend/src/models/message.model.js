import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.String,
    },
    image: {
      type: mongoose.Schema.Types.String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
