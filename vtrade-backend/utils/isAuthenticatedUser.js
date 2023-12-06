import { customError } from "./customError.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  console.log("Checking Authentication");
  const token = req.cookies.access_token;
  console.log("Access Token: ", token);
  // console.log(token);
  if (!token) {
    return next(customError(401, "You need to logged In"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(customError(401, "You need to logged In"));
    }
    req.user = user;
    // console.log(req.user);
    next();
  });
};
