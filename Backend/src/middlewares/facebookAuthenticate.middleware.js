import passport from "passport";
import EnvConstant from "../common/constant/env.constant.js";

export const facebookAuthenticateMiddleware = passport.authenticate("facebook");

export const facebookCallbackMiddleware = passport.authenticate("facebook", {
  successRedirect: EnvConstant.CLIENT_URL,
  failureRedirect: `${EnvConstant.SERVER_URL}/api/auth/authenticated/failed`,
});
