import { resend } from "@/lib/resend";
import VerificationEmail from "../../templates/verificationEmail";
import ApiResponse from "@/types/ApiResponse";

export default async function sendVerificationEmail(
  username: string,
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
