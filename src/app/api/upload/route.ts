import { NextRequest, NextResponse } from "next/server";
import { getSignedUrlForUpload } from "@/lib/r2";

export async function POST(request: NextRequest) {
  const { directory, fileName, fileType } = await request.json();

  const key = `${directory}/${fileName}`;

  try {
    const signedUrl = await getSignedUrlForUpload(key, fileType);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating signed URL" },
      { status: 500 },
    );
  }
}
