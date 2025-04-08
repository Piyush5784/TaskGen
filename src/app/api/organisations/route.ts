import { prisma } from "@/db/prisma";
import { organisationSchema } from "@/types/org-types";
import { getUser } from "@/utils/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success || !user.email) {
      return NextResponse.json({ message, success });
    }
    const body = await req.json();

    const checkData = organisationSchema.safeParse(body);
    if (!checkData.success) {
      return NextResponse.json({ message: "Invalid data", success: false });
    }
    const checkName = await prisma.organisations.findFirst({
      where: {
        user: { email: user?.email },
        name: body.orgName,
      },
    });

    if (checkName) {
      return NextResponse.json({
        message: "Organisation already exits with this name",
        success: false,
      });
    }

    const {
      orgName,
      orgType,
      otherType,
      description,
      size,
      contactEmail,
      contactPhone,
      location,
    } = body;

    const organisation = await prisma.organisations.create({
      data: {
        name: orgName,
        countryName: location[0],
        phoneNo: Number(contactPhone),
        email: contactEmail,
        size,
        description,
        type: orgType || otherType,
        user: {
          connect: { id: user.id },
        },
      },
    });

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        selectedOrg: organisation.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Organisation successfully created",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }

    const organisations = await prisma.organisations.findMany({
      where: {
        user: {
          email: user.email,
        },
      },
    });

    return NextResponse.json({
      message: "Organisations successfully fetched",
      success: true,
      data: organisations,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to get Organisations",
      success: false,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }
    const body = await req.json();
    const checkOrganisation = await prisma.organisations.findFirst({
      where: {
        name: body.orgName,
      },
    });
    if (!checkOrganisation) {
      return NextResponse.json({
        message: "Organisation not found",
        success: false,
      });
    }

    const checkData = organisationSchema.safeParse(body);
    if (!checkData.success) {
      return NextResponse.json({ message: "Invalid data", success: false });
    }

    const {
      id,
      orgName,
      orgType,
      otherType,
      description,
      size,
      contactEmail,
      contactPhone,
      location,
    } = body;

    const organisation = await prisma.organisations.findFirst({
      where: {
        id,
        user: { email: user.email },
      },
    });

    if (!organisation) {
      return NextResponse.json({
        message: "Organisation not found",
        success: false,
      });
    }

    const updatedOrganisation = await prisma.organisations.update({
      where: { id },
      data: {
        name: orgName,
        countryName: location[0],
        phoneNo: Number(contactPhone),
        email: contactEmail,
        size,
        description,
        type: orgType || otherType,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Organisation successfully updated",
      data: updatedOrganisation,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update organisation details, Something went wrong",
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Organisation Id is required",
      });
    }

    const organisation = await prisma.organisations.findFirst({
      where: {
        id,
        user: { email: user.email },
      },
    });

    if (!organisation) {
      return NextResponse.json({
        message: "Organisation not found",
        success: false,
      });
    }

    await prisma.organisations.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Organisation successfully deleted",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete organisation, Something went wrong",
    });
  }
}
