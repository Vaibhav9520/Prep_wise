import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

// Ultra-simple VAPI configuration for testing
export const simpleInterviewer: CreateAssistantDTO = {
  name: "Test Interviewer",
  firstMessage: "Hello! This is a test interview. Can you hear me?",
  
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a test interviewer. Just have a simple conversation and ask basic questions like 'How are you?' and 'Tell me about yourself'. Keep responses very short.",
      },
    ],
  },
};

export const simpleGenerator: CreateAssistantDTO = {
  name: "Test Generator",
  firstMessage: "Hello! I'm here to help generate questions. What would you like?",
  
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You help generate interview questions. Ask what they need and provide simple questions. Keep responses short.",
      },
    ],
  },
};