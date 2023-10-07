import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  otp: {
    type: Schema.Types.Number,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  expiredAt: {
    type: Schema.Types.Date,
    required: true,
  },
});

const Otp = model("Otp", otpSchema);
export default Otp;
