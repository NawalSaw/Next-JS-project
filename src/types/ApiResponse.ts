import { Message } from "@/models/user.model";

interface ApiResponse {
  success: boolean;
  message: string;
  messages?: Array<Message>;
  isAcceptingMessages?: boolean;
}

export default ApiResponse;
