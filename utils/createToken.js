import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};
