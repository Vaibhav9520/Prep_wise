import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function testGeminiModels() {
  const modelNames = [
    "gemini-1.5-pro",
    "gemini-1.5-flash", 
    "gemini-1.0-pro",
    "gemini-pro",
    "models/gemini-1.5-pro",
    "models/gemini-1.5-flash",
    "models/gemini-pro"
  ];
  
  console.log("Testing available Gemini models...");
  
  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, this is a test.");
      const response = await result.response;
      const text = response.text();
      
      if (text) {
        console.log(`✅ Model ${modelName} is working!`);
        return modelName; // Return the first working model
      }
    } catch (error: unknown) {
      console.log(`❌ Model ${modelName} failed:`, error instanceof Error ? error.message : String(error));
    }
  }
  
  console.log("❌ No working models found");
  return null;
}

// Test function to be called manually
export async function runModelTest() {
  const workingModel = await testGeminiModels();
  if (workingModel) {
    console.log(`🎉 Use this model: ${workingModel}`);
  } else {
    console.log("🚫 No models available with current API key");
  }
}