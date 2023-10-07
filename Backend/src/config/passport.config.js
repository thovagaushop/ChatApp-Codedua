import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import * as userService from "../services/user.service.js";
import * as bcrypt from "bcrypt";
import MessageConstant from "../common/constant/message.constant.js";
import EnvConstant from "../common/constant/env.constant.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userService.findOne({ email });
        if (!user)
          return done(null, false, { message: MessageConstant.WRONG_EMAIL });
        // else if (!bcrypt.compareSync(password, user.password))
        //   return done(null, false, { message: MessageConstant.WRONG_PASSWORD });
        else {
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EnvConstant.JWT_SECRET,
    },
    async function (payload, done) {
      try {
        console.log("Payload : ", payload);
        const user = await userService.findById(payload.payload.sub);
        if (!user)
          return done(null, false, { message: MessageConstant.USER_NOT_FOUND });
        else return done(null, user);
      } catch (error) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.findById(id);
  done(null, user);
});

export default passport;
