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
