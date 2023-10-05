import { config } from "dotenv";
config();

const EnvConstant = {
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_URI: process.env.DB_URI,
  SALT_ROUND: parseInt(process.env.SALT_ROUND, 10),
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_EMAIL: process.env.BASE_EMAIL,
  PASS_EMAIL: process.env.PASS_EMAIL,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  GOOGLE_CERT_URL: process.env.GOOGLE_CERT_URL,
};

export default EnvConstant;
