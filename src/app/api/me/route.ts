import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Yosita Satiman",
    studentId: "660610788",
  });
};
