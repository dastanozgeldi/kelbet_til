export const runtime = "nodejs";

export const dynamic = "force-dynamic";

import { ratelimit } from "@/ratelimit";
import { waitUntil } from "@vercel/functions";

export async function GET(
  _: Request,
  { params }: { params: { userId: string } },
) {
  const { success, limit, remaining, pending } = await ratelimit.limit(
    params.userId,
  );

  const response = {
    success: success,
    limit: limit,
    remaining: remaining,
  };

  // pending is a promise for handling the analytics submission
  waitUntil(pending);

  if (!success) {
    return new Response(JSON.stringify(response), { status: 429 });
  }
  return new Response(JSON.stringify(response));
}
