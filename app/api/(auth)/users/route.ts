import connect from "@/app/lib/db";
import user from "@/app/lib/models/users";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
const objectId = require("mongoose").Types.objectId;

export const GET = async () => {
  try {
    await connect();
    const users = await user.find();
    return new NextResponse(
      JSON.stringify({ users, message: "Users fetched successfully!" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in fetching users", error.message);
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const newUser = new user(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: "User is created!", newUser }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(`Error in creating user ${error.message}`, {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, newUsername } = body;
    await connect();
    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: "User ID or username not provided!" }),
        { status: 500 }
      );
    }
    if (!objectId.Types.isvalid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User ID invalid" }), {
        status: 500,
      });
    }
    const isUserFoundInDB = await user.findOneAndUpdate(
      {
        _id: new Types.ObjectId(),
        username: newUsername,
      },
      { new: true }
    );

    if (!isUserFoundInDB) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully!",
        user: isUserFoundInDB,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`Error in updating user ${error.message}`, {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID not provided!" }),
        { status: 500 }
      );
    }
    if (!objectId.Types.isvalid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User ID invalid" }), {
        status: 500,
      });
    }
    await connect();

    const deleteUserById = await user.findByIdAndDelete(userId);
    if (!deleteUserById) {
      return new NextResponse(
        JSON.stringify({ message: `User not found with userId: ${userId}` }),
        {
          status: 500,
        }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: `User deleted with userID :${userId}`,
        user: deleteUserById,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(`Error in updating user ${error.message}`, {
      status: 500,
    });
  }
};
