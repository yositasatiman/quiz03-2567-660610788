import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { Database } from "@lib/types";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const roomId = request.nextUrl.searchParams.get('roomId');
  const roomName = request.nextUrl.searchParams.get('roomId');

  const parseResult = readDB.cloneDeep({
    roomId,
    roomName,
  });
  readDB();
  if (parseResult.success === false)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  };

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { role, message } = body;

  readDB();
  const user = (<Database>DB).users.find(
    (user) => user.username === checkToken()
  );
  if (!user || user.role!== "ADMIN") {
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  const body = await request.json();
  const rawAuthHeader = headersData.safeParse(body);

if (rawAuthHeader.headersData === false)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  readDB();
if (rawAuthHeader.headersData === -1 )
  return NextResponse.json(
    {
    ok: false,
      message: "Message is not found",
    },
    { status: 404 }
  );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};