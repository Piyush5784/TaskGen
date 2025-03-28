import { getUser } from "@/app/api/user/route";
import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success || !user.email) {
      return NextResponse.json({ message, success });
    }
    const body = await req.json();

    const { projectName, description, projectId } = body;
    if (!description || !projectName || !projectId) {
      return NextResponse.json({
        message: "Invalid data",
        success: false,
      });
    }

    await prisma.projects.create({
      data: {
        name: projectName,
        description,
        organisation: {
          connect: { id: projectId },
        },
        user: {
          connect: { email: user.email },
        },
      },
    });

    return NextResponse.json({
      message: "Project successfully created",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create project, Something went wrong!",
      success: false,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }
    const url = new URL(req.url);
    const id = url.searchParams.get("organisationId");

    if (!id) {
      return NextResponse.json({
        message: "Organisation Id is required to fetch data",
        success: false,
      });
    }

    const project = await prisma.projects.findMany({
      where: {
        organisationId: id,
        user: {
          email: user.email,
        },
      },
    });

    if (!project) {
      return NextResponse.json({
        message: "Invalid project id",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Project details successfully fetched",
      data: project,
      success: "false",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong! can't fetch project details",
      success: false,
    });
  }
}
