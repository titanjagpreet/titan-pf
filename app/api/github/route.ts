import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/github";

/** Always fetch live data; avoid stale contribution totals from caching. */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const data = await fetchGitHubContributions(username);
  return NextResponse.json({ data });
}
