import { NextResponse } from "next/server";
import { testGeminiModels } from "@/lib/test-gemini";

export async function GET() {
  try {
    const workingModel = await testGeminiModels();
    
    return NextResponse.json({
      success: true,
      workingModel,
      message: workingModel ? `Found working model: ${workingModel}` : "No working models found"
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}