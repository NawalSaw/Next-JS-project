import mongoose from "mongoose";

export interface Message extends mongoose.Document {
  content: string;
  createdAt: Date;
}

const messageSchema: mongoose.Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export interface UserType extends mongoose.Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const userSchema: mongoose.Schema<UserType> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: [messageSchema],
  },
});

export const User =
  (mongoose.models.User as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("User", userSchema);
