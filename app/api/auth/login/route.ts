import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}login/`,
      body,
      { validateStatus: () => true }
    );

    if (
      backendRes.status !== 200 ||
      backendRes.data?.error_status === true
    ) {
      return NextResponse.json(
        { message: backendRes.data?.message || "Login failed" },
        { status: backendRes.status }
      );
    }

    const { access, refresh, name } = backendRes.data.data;

    const res = NextResponse.json({ success: true });

    res.cookies.set("access_token", access, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
    });

    res.cookies.set("refresh_token", refresh, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set("user_name", name, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
