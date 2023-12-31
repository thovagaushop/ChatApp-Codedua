import express from "express";
import session from "express-session";
import cors from "cors";
import connection from "./config/database.config.js";
import routes from "./routes/index.js";
import EnvConstant from "./common/constant/env.constant.js";
import passport from "./config/passport.config.js";
import { Server } from "socket.io";
import socketListener from "./listeners/socketListener.js";
// Port
const PORT = EnvConstant.PORT || 3000;

// Create app
const app = express();
// Connect database
connection();
// Body parser
app.use(express.json());
// Cors
app.use(cors({ origin: EnvConstant.CLIENT_URL, credentials: true }));
// Session
app.use(
  session({
    secret: EnvConstant.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use("/api", routes);

const server = app.listen(PORT, () => {
  console.log("Server is running at port : " + PORT);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

socketListener(io);
