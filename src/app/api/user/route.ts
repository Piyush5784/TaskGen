// import { authOptions } from "@/config/authOptions";
// import { prisma } from "@/db/prisma";
// import { User } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { NextResponse } from "next/server";
// interface SuccessResponse {
//   message: string;
//   success: boolean;
//   data?: User | null;
// }

// interface ErrorResponse {
//   message: string;
//   success: boolean;
// }

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({
//         message: "You must be logged in.",
//         success: false,
//       });
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         email: session.user?.email as string,
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "user not found", success: false });
//     }

//     return NextResponse.json({
//       message: "Success",
//       success: true,
//       data: user || null,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       message: "Failed to get user",
//       success: false,
//       data: null,
//     });
//   }
// }

// utils/getUser.ts
"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth/next";

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return { success: false, message: "You must be logged in.", user: null };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!user) {
    return { success: false, message: "User not found", user: null };
  }

  return { success: true, message: "Success", user };
}
