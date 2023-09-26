import { config } from "dotenv";
config();

const EnvConstant = {
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_URI: process.env.DB_URI,
  SALT_ROUND: parseInt(process.env.SALT_ROUND, 10),
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET_KEY: process.env.GOOGLE_CLIENT_SECRET_KEY,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET_ID: process.env.FACEBOOK_CLIENT_SECRET_ID,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default EnvConstant;
