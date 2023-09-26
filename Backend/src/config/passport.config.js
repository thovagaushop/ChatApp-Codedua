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
        else if (!bcrypt.compareSync(password, user.password))
          return done(null, false, { message: MessageConstant.WRONG_PASSWORD });
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
        const user = await userService.findById(payload.sub);
        console.log("Vao day");
        if (!user)
          return done(null, false, { message: MessageConstant.USER_NOT_FOUND });
        else return done(null, user);
      } catch (error) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: EnvConstant.GOOGLE_CLIENT_ID,
      clientSecret: EnvConstant.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${EnvConstant.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await userService.findOne({
        providerId: "google" + profile.id,
      });
      if (!user) {
        user = await userService.create({
          email: profile.emails[0].value,
          username: profile.displayName,
          authProvider: "google",
          providerId: "google" + profile.id,
          avatar: profile.photos[0].value,
        });
      }
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: EnvConstant.FACEBOOK_CLIENT_ID,
      clientSecret: EnvConstant.FACEBOOK_CLIENT_SECRET_ID,
      callbackURL: `${EnvConstant.SERVER_URL}/api/auth/facebook/callback`,
      profileFields: ["id", "email", "photos", "link", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let user = await userService.findOne({
        providerId: "facebook" + profile.id,
      });
      console.log(user);
      if (!user) {
        user = await userService.create({
          email: profile.emails ? profile.emails[0].value : null,
          username:
            profile.name.familyName +
            " " +
            (profile.name.middleName ? profile.name.middleName + " " : "") +
            profile.name.givenName,
          authProvider: "facebook",
          providerId: "facebook" + profile.id,
          avatar: profile.photos[0].value,
        });
      }
      done(null, user);
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
