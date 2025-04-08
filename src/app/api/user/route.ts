import { getUser } from "@/utils/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getUser();
  return NextResponse.json(result);
}
