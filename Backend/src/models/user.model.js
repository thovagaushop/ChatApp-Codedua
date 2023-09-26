import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
  authProvider: {
    type: String,
    default: "local",
  },
  providerId: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
