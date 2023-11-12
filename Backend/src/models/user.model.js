import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
    },
    dob: {
      type: mongoose.Schema.Types.Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
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
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    timeBlock: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },
    // So lan duoc chat
    timesChated: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
