import prisma from "@/db/prisma";
import { getUser } from "@/utils/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success || !user.email) {
      return NextResponse.json({ message, success });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        message: "Project ID is required",
        success: false,
      });
    }

    const project = await prisma.projects.findUnique({
      where: {
        user: {
          id: user.id,
        },
        id,
      },
    });

    if (!project) {
      return NextResponse.json({
        message: "Invalid Project Id",
        success: false,
      });
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        selectedProjectId: id,
      },
    });

    return NextResponse.json({
      message: "Project Successfully Selected",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to Select project",
      success: false,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success || !user.email) {
      return NextResponse.json({ message, success });
    }

    const selectProject = await prisma.user.findUnique({
      where: {
        id: user.id,
        email: user.email,
      },
      select: { selectedProjectId: true },
    });

    return NextResponse.json({
      message: "Selected Project successfully fetched",
      data: selectProject,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetched selected project",
      success: false,
    });
  }
}
