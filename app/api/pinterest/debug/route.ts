import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    appId: Boolean(process.env.PINTEREST_APP_ID),
    appSecret: Boolean(process.env.PINTEREST_APP_SECRET),
    sessionSecret: Boolean(process.env.PINTEREST_SESSION_SECRET),
    vercelEnv: process.env.VERCEL_ENV || null,
  });
}
