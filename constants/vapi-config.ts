import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

// Simplified VAPI configuration that should work reliably
export const baseVoiceConfig = {
  provider: "playht" as const,
  voiceId: "jennifer",
};

export const baseTranscriberConfig = {
  provider: "deepgram" as const,
  model: "nova-2",
  language: "en",
};

export const baseModelConfig = {
  provider: "openai" as const,
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 150,
};

export const interviewer: CreateAssistantDTO = {
  name: "AI Interviewer",
  firstMessage: "Hello! I'm ready to conduct your interview. Let's begin.",
  
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
    temperature: 0.7,
    maxTokens: 100,
    messages: [
      {
        role: "system",
        content: `You are an AI interviewer. Ask the interview questions one by one.

Questions: {{questions}}

Keep responses very short. Ask one question, wait for answer, then next question.`,
      },
    ],
  },
};

export const interviewGenerator: CreateAssistantDTO = {
  name: "Question Generator",
  firstMessage: "Hi! I'll help create interview questions. What role are you preparing for?",
  
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
    temperature: 0.7,
    maxTokens: 100,
    messages: [
      {
        role: "system",
        content: `Help create interview questions. Ask what role they want, their level, and tech stack. Then generate 5-8 questions.

Keep responses short and conversational.`,
      },
    ],
  },
};