import passport from "passport";
import EnvConstant from "../common/constant/env.constant.js";

export const googleauthenticateMiddleware = passport.authenticate("google", {
  scope: ["profile", ["email"]],
});

export const googleCallbackMiddleware = passport.authenticate("google", {
  successRedirect: EnvConstant.CLIENT_URL,
  failureRedirect: `${EnvConstant.SERVER_URL}/api/auth/authenticated/failed`,
});
