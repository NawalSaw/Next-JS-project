import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/models/user.model";

export async function GET() {
  await dbConnect();

  try {
    // get 10 random messages from all users
    const randomMessages = await User.aggregate([
      {
        // unwind the messages array into individual documents
        $unwind: "$messages",
      },
      {
        // unwind the messages array into individual documents
        $sample: { size: 10 },
      },
      {
        // get the content of the message
        $replaceRoot: { newRoot: "$messages" },
      },
      {
        $project: {
          content: 1,
          _id: 0,
        },
      },
    ]);

    return Response.json(
      { success: true, message: "Messages suggested", data: randomMessages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in suggesting messages", error);
    return Response.json(
      { success: false, message: "Error suggesting messages" },
      { status: 500 }
    );
  }
}
