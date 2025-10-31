import Vapi from "@vapi-ai/web";

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
console.log("🔑 VAPI Token loaded:", token ? "✅ Present" : "❌ Missing");

if (!token) {
  console.error("❌ VAPI_WEB_TOKEN is missing from environment variables");
}

export const vapi = new Vapi(token!);
