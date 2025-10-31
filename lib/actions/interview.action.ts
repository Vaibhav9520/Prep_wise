"use server";

import { db } from "@/firebase/admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Function to get available model (same as in cv.action.ts)
async function getAvailableModel() {
  try {
    const modelNames = [
      "gemini-1.5-pro",
      "gemini-1.0-pro", 
      "gemini-pro",
      "models/gemini-1.5-pro",
      "models/gemini-pro"
    ];
    
    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        return model;
      } catch {
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error getting available model:", error);
    return null;
  }
}

export async function getPersonalizedInterview(interviewId: string) {
  try {
    const interviewDoc = await db.collection("interviews").doc(interviewId).get();
    
    if (!interviewDoc.exists) {
      return null;
    }

    return {
      id: interviewDoc.id,
      ...interviewDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching interview:", error);
    return null;
  }
}

export async function submitInterviewAnswer(params: {
  interviewId: string;
  questionId: string;
  answer: string;
  timeSpent: number;
}) {
  const { interviewId, questionId, answer, timeSpent } = params;

  try {
    // Store the answer
    await db.collection("interviews").doc(interviewId).collection("answers").doc(questionId).set({
      questionId,
      answer,
      timeSpent,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting answer:", error);
    return { success: false, message: "Failed to submit answer" };
  }
}

export async function generateDetailedFeedback(params: {
  interviewId: string;
  userId: string;
  answers: InterviewAnswer[];
  questions: PersonalizedQuestion[];
}) {
  const { interviewId, userId, answers, questions } = params;

  try {
    const model = await getAvailableModel();
    
    if (!model) {
      console.log("No AI model available, using fallback feedback");
      // Fallback feedback
      const feedback = {
        overallScore: 75,
        communicationScore: 75,
        technicalScore: 75,
        confidenceScore: 75,
        strengths: ["Completed all questions", "Good effort shown"],
        weaknesses: ["Could provide more detailed answers", "Time management could be improved"],
        detailedAnalysis: "Overall good performance. The interview was completed successfully with room for improvement in providing more detailed responses and better time management.",
        improvementSuggestions: ["Practice explaining concepts in more detail", "Work on time management skills", "Prepare specific examples for behavioral questions"],
        categoryBreakdown: { technical: 75, behavioral: 75, communication: 75 }
      };

      // Store feedback in database
      const feedbackDoc = await db.collection("feedback").add({
        userId,
        interviewId,
        ...feedback,
        answers,
        createdAt: new Date().toISOString(),
      });

      // Update user statistics
      await updateUserStats(userId, feedback.overallScore);

      return {
        success: true,
        feedbackId: feedbackDoc.id,
        feedback,
      };
    }

    // Create detailed analysis prompt
    const analysisData = questions.map(q => {
      const answer = answers.find(a => a.questionId === q.id);
      return {
        question: q.question,
        type: q.type,
        category: q.category,
        difficulty: q.difficulty,
        timeLimit: q.timeLimit,
        answer: answer?.answer || "No answer provided",
        timeSpent: answer?.timeSpent || 0,
      };
    });

    const prompt = `
    Analyze this interview performance and provide detailed feedback:
    
    Interview Data: ${JSON.stringify(analysisData, null, 2)}
    
    Please provide analysis in JSON format:
    {
      "overallScore": 85,
      "communicationScore": 80,
      "technicalScore": 90,
      "confidenceScore": 75,
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "detailedAnalysis": "comprehensive analysis text",
      "improvementSuggestions": ["suggestion1", "suggestion2"],
      "categoryBreakdown": {
        "technical": 85,
        "behavioral": 80,
        "communication": 75
      }
    }
    
    Consider:
    - Answer quality and relevance
    - Time management (compared to time limits)
    - Technical accuracy
    - Communication clarity
    - Confidence indicators
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedbackText = response.text();

    let feedback;
    try {
      feedback = JSON.parse(feedbackText);
    } catch {
      // Fallback feedback if JSON parsing fails
      feedback = {
        overallScore: 80,
        communicationScore: 78,
        technicalScore: 82,
        confidenceScore: 76,
        strengths: ["Good communication", "Completed all questions", "Showed enthusiasm"],
        weaknesses: ["Could provide more detailed examples", "Time management could be improved"],
        detailedAnalysis: "Overall solid performance. The candidate demonstrated good understanding of the topics and communicated clearly. There's room for improvement in providing more specific examples and managing time more effectively.",
        improvementSuggestions: ["Practice explaining concepts with specific examples", "Work on time management during responses", "Prepare STAR method examples for behavioral questions"],
        categoryBreakdown: { technical: 82, behavioral: 78, communication: 76 }
      };
    }

    // Store feedback in database
    const feedbackDoc = await db.collection("feedback").add({
      userId,
      interviewId,
      ...feedback,
      answers,
      createdAt: new Date().toISOString(),
    });

    // Update user statistics
    await updateUserStats(userId, feedback.overallScore);

    return {
      success: true,
      feedbackId: feedbackDoc.id,
      feedback,
    };
  } catch (error) {
    console.error("Error generating feedback:", error);
    return {
      success: false,
      message: "Failed to generate feedback",
    };
  }
}

async function updateUserStats(userId: string, newScore: number) {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    const userData = userDoc.data();
    
    if (userData) {
      const totalInterviews = (userData.totalInterviews || 0) + 1;
      const currentAverage = userData.averageScore || 0;
      const newAverage = ((currentAverage * (totalInterviews - 1)) + newScore) / totalInterviews;
      
      await db.collection("users").doc(userId).update({
        totalInterviews,
        averageScore: Math.round(newAverage),
        lastInterviewDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error updating user stats:", error);
  }
}

export async function getDetailedFeedback(feedbackId: string) {
  try {
    const feedbackDoc = await db.collection("feedback").doc(feedbackId).get();
    
    if (!feedbackDoc.exists) {
      return null;
    }

    return {
      id: feedbackDoc.id,
      ...feedbackDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
}