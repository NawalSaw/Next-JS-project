import mongoose from "mongoose";
import { ApiError } from "../helpers/ApiError";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export async function dbConnect() {
  try {
    if (connection.isConnected) {
      console.log("Already connected");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("🖇Connected to MongoDB");
  } catch (error: ApiError | any) {
    console.log("mongodb error", error.message);
    process.exit(1);
  }
}
