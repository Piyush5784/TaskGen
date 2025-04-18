import { prisma } from "@/db/prisma";
import { getUser } from "@/utils/getUser";
import { NextRequest, NextResponse } from "next/server";
// import { getUser } from "../../user/route";

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success || !user.email) {
      return NextResponse.json({ message, success });
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: { selectedOrg: true },
    });

    if (!userData?.selectedOrg) {
      return NextResponse.json({
        message: "User has not selected any org",
        success: false,
      });
    }

    const selectedOrg = await prisma.organisations.findUnique({
      where: { id: userData.selectedOrg },
    });

    const projects = await prisma.projects.findMany({
      where: {
        organisationId: userData.selectedOrg,
        user: {
          email: user.email,
        },
      },
    });

    return NextResponse.json({
      message: "success",
      success: true,
      data: selectedOrg,
      projects,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error retrieving organization",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

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
        message: "Organization ID is required",
        success: false,
      });
    }

    // Check if organization exists
    const orgExists = await prisma.organisations.findUnique({
      where: { id },
    });

    if (!orgExists) {
      return NextResponse.json({
        message: "Organization does not exist",
        success: false,
      });
    }

    // Update user's selected org
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: { selectedOrg: id },
    });

    return NextResponse.json({
      message: "Organization selected successfully",
      success: true,
      data: { selectedOrg: id },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to select organization",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
