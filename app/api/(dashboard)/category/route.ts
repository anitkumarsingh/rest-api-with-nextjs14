import Users from "@/app/lib/models/users";
import Category from "@/app/lib/models/category";
import connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
        status: 400,
      });
    }
    await connect();

    const user = await Users.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const categories = await Category.find({
      user: new Types.ObjectId(userId),
    });
    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "Categories not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        categories,
        message: "Categories fetched successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in fetching category" + error.message, {
      status: 500,
    });
  }
};
