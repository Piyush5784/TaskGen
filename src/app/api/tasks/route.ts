import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../user/route";

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }
    const url = new URL(req.url);
    const id = url.searchParams.get("projectId");

    if (!id) {
      return NextResponse.json({
        message: "Project Id is required to fetch data",
        success: false,
      });
    }

    const org = await prisma.tasks.findFirst({
      where: {
        projectId: id,
        user: {
          email: user.email,
        },
      },
    });

    if (!org) {
      return NextResponse.json({
        message: "Invalid Project id",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Tasks details successfully fetched",
      data: org,
      success: "false",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong! can't fetch Tasks details details",
      success: false,
    });
  }
}
