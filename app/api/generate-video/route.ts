import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    // Yahan Gemini Veo 3 API connect hogi
    return NextResponse.json({ 
      success: true, 
      videoUrl: "demo",
      message: `Video for topic: ${topic} is ready!`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed" }, { status: 500 });
  }
}
