import { NextResponse } from "next/server";
import { deleteScan } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function DELETE(_request: Request, ctx: RouteContext<"/api/scans/[id]">) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await ctx.params;
  const deleted = await deleteScan(user.id, id);
  return deleted
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Scan not found." }, { status: 404 });
}
