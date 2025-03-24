import { prisma } from "@/db/prisma";
import { organisationSchema } from "@/types/org-types";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../user/route";

export async function POST(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
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

    return NextResponse.json({
      success: true,
      message: "Organisation successfully created",
      data: organisation,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
