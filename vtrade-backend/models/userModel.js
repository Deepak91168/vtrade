import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    avatar: { type: String , default: "https://i.imgur.com/6VBx3io.png"}
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
