import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendEmail";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();
    const name = username.toLowerCase().trim();
    const verifiedUserByUsername = await User.findOne({
      name,
      isVerified: true,
    });

    console.log(verifiedUserByUsername);

    if (verifiedUserByUsername) {
      return Response.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await User.findOne({
      email,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "Email already taken" },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save({ validateBeforeSave: true });
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 10);

      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailEResponse = await sendVerificationEmail(
      username,
      email,
      verifyCode
    );
    if (!emailEResponse.success) {
      return Response.json(
        { success: false, message: emailEResponse.message },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully | Please verify your account",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("error registering user", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
