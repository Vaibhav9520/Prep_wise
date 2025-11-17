"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { simpleInterviewer, simpleGenerator } from "@/constants/simple-vapi";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions, // eslint-disable-line @typescript-eslint/no-unused-vars
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      console.log("✅ Call started successfully");
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("📞 Call ended");
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      console.log("💬 Message received:", message);
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("🎤 Speech started");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("🔇 Speech ended");
      setIsSpeaking(false);
    };

    const onError = (error: unknown) => {
      console.error("❌ VAPI Error:", error);

      // Handle specific error types
      if (error && typeof error === 'object' && 'error' in error) {
        const errorObj = error as { error?: { type?: string }; errorMsg?: string };
        if (errorObj.error?.type === 'ejected' || errorObj.errorMsg?.includes('Meeting has ended')) {
          console.log("⚠️ Call was ejected or ended unexpectedly - this might be a configuration issue");
          setCallStatus(CallStatus.FINISHED);
        } else {
          console.log("🔄 Resetting to inactive due to error");
          setCallStatus(CallStatus.INACTIVE);
        }
      } else {
        console.log("🔄 Resetting to inactive due to unknown error");
        setCallStatus(CallStatus.INACTIVE);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);
      console.log("Starting VAPI connection...", { type, userName, userId });

      // Check if VAPI token is available
      const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
      if (!token) {
        throw new Error("VAPI token is not configured. Please check your environment variables.");
      }

      // Select the appropriate assistant configuration
      const assistantConfig = type === "generate" ? simpleGenerator : simpleInterviewer;
      console.log("Using assistant config:", assistantConfig.name);

      // Start the VAPI call
      const result = await vapi.start(assistantConfig);
      console.log("VAPI connection established:", result);

      // The call-start event will set status to ACTIVE
    } catch (error) {
      console.error("Failed to start VAPI connection:", error);
      setCallStatus(CallStatus.INACTIVE);

      // More specific error messages
      let errorMessage = "Failed to connect to the interview system.\n\n";
      if (error instanceof Error) {
        if (error.message.includes('token') || error.message.includes('VAPI token')) {
          errorMessage += "Issue: VAPI token is missing or invalid.\n";
          errorMessage += "Please check your environment configuration.";
        } else if (error.message.includes('assistant')) {
          errorMessage += "Issue: Assistant configuration error.\n";
          errorMessage += error.message;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage += "Issue: Network connection problem.\n";
          errorMessage += "Please check your internet connection.";
        } else {
          errorMessage += "Error: " + error.message;
        }
      } else {
        errorMessage += "An unknown error occurred. Please try again.";
      }

      alert(errorMessage);
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative btn-call"
            onClick={() => handleCall()}
            disabled={callStatus === "CONNECTING"}
          >
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-full bg-fresh-green opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Connect"
                : "Connecting..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
