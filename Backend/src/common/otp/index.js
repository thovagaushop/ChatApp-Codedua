import nodemailer from "nodemailer";
import EnvConstant from "../constant/env.constant.js";

export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: EnvConstant.BASE_EMAIL,
    pass: EnvConstant.PASS_EMAIL,
  },
});

export const sendMailOtp = async (otp, receiveEmail) => {
  try {
    const option = {
      from: EnvConstant.BASE_EMAIL,
      to: receiveEmail,
      subject: "Verify your Email",
      html: `<p>Enter ${otp} in the app  to verify your email
        <p>This code <b>expires in 5 minutes</b></p>
        </p>`,
    };
    await transport.sendMail(option);
  } catch (error) {
    console.log("Error when send message : ", error.message);
    throw error;
  }
};
