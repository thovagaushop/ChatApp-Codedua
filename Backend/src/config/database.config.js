import mongoose from "mongoose";
import EnvConstant from "../common/constant/env.constant.js";

const connection = async () => {
  try {
    await mongoose.connect(EnvConstant.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect database success!!");
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Error when connect database ...");
  }
};

export default connection;
