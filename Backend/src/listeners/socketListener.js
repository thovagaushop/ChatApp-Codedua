import { verifyToken } from "../services/jwt.service.js";
import * as userService from "../services/user.service.js";
import ChatRoom from "../models/chatRoom.model.js";
import User from "../models/user.model.js";
const client = [];

const socketListener = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected : ", socket.id);

    // Authenticate with socket
    const token = socket.handshake.auth?.token;

    if (!token || !verifyToken(token)) {
      socket.emit("error", { errror: "Invalid token" });
    } else {
      const {
        payload: { sub, username, avatar },
      } = verifyToken(token);

      // Find partner
      socket.on("find-partner", async (data) => {
        const user = await userService.findById(sub);

        if (user.timeBlock > new Date()) {
          socket.to(socket.id).emit("blocking", "User is blocked ...");
          return;
        }

        if (!client.length) {
          client.push({
            socket,
            userId: sub,
          });
        } else {
          const userFriendId = client[0];
          let chatRoom = await ChatRoom.findOne({
            users: { $all: [sub, userFriendId.userId] },
          });

          if (!chatRoom) {
            // tao 1 phong moi
            chatRoom = await ChatRoom.create({
              chatRoomName: sub + "_" + userFriendId.userId + "_room",
              users: [sub, userFriendId.userId],
            });
          }
          socket.join(chatRoom.id);
          userFriendId.socket.join(chatRoom.id);

          // Cong 1 lan ghep doi cho ca 2 user
          await Promise.all([
            User.findByIdAndUpdate(sub, { $inc: { timesChated: 1 } }),
            User.findByIdAndUpdate(userFriendId.userId, {
              $inc: { timesChated: 1 },
            }),
          ]);
          io.to(chatRoom.id).emit("joined-to-room", chatRoom);
        }
      });

      socket.on("join-to-existed-room", (chatRoomId) => {
        socket.join(chatRoomId);
        console.log("User joined in room " + chatRoomId);
      });

      socket.on("send-message", (message) => {
        socket.in(message.chatRoom).emit("receive-message", message);
      });

      socket.on("disconnect", () => {
        console.log("disconected");
      });
    }
  });
};

export default socketListener;
