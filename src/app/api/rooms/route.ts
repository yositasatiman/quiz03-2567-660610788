import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  DB.students.push(body);
  return NextResponse.json({
    ok: true,
    rooms: `${body.roomId}
            ${body.roomName}`
    totalRooms: "2"
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  
  if(payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  readDB();
  if(payload)
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${"replace this with room name"} already exists`,
    },
    { status: 400 }
  );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
