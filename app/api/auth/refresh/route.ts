import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST() {
  const myCookies =await cookies();
  const refresh = myCookies.get("refresh_token")?.value;

  if (!refresh) {
    return NextResponse.json({}, { status: 401 });
  }

  const backendRes = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}refresh/`,
    { refresh }
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set("access_token", backendRes.data.access, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15,
  });

  return res;
}
