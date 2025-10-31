import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "No API key found"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try a simple generation with different models
    const testModels = [
      "gemini-1.5-flash",
      "gemini-1.5-pro", 
      "gemini-pro",
      "gemini-1.0-pro"
    ];
    
    for (const modelName of testModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        const text = response.text();
        
        return NextResponse.json({
          success: true,
          message: `Found working model: ${modelName}`,
          workingModel: modelName,
          testResponse: text
        });
      } catch {
        continue;
      }
    }
    
    return NextResponse.json({
      success: false,
      error: "No working models found",
      apiKeyValid: true
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      apiKeyValid: false
    });
  }
}