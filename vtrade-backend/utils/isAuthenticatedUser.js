import { customError } from "./customError.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, "You need to logged In"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(customError(401, "You need to logged In"));
    }
    req.user = user;
    next();
  });
};
