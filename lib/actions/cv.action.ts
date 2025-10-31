"use server";

import { db } from "@/firebase/admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Function to get available model
async function getAvailableModel() {
  try {
    // Try the most common model names in order of preference
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
        // Test the model with a simple prompt
        await model.generateContent("Hello");
        return model;
      } catch (error) {
        console.log(`Model ${modelName} not available:`, error);
        continue;
      }
    }
    
    // If no model works, return null
    return null;
  } catch (error) {
    console.error("Error getting available model:", error);
    return null;
  }
}

export async function uploadCV(params: CVUploadParams) {
  const { userId, file } = params;

  try {
    // Convert file to text (simplified - in production, use proper PDF/DOC parsing)
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromFile(arrayBuffer);

    // Store CV URL and extracted text in database
    await db.collection("users").doc(userId).update({
      cvURL: `cv_${userId}_${Date.now()}`, // In production, store actual file URL
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "CV uploaded successfully",
      extractedText: text,
    };
  } catch (error) {
    console.error("CV upload error:", error);
    return {
      success: false,
      message: "Failed to upload CV",
    };
  }
}

export async function analyzeCV(params: CVProcessingParams) {
  const { userId, cvText } = params;

  try {
    const model = await getAvailableModel();
    
    if (!model) {
      console.log("No AI model available, using fallback analysis");
      // Fallback to basic text analysis
      const analysis = {
        skills: extractSkillsFromText(cvText),
        education: "Education information extracted from CV",
        experience: "Experience information extracted from CV", 
        projects: "Projects information extracted from CV",
        keywords: extractKeywordsFromText(cvText),
      };

      // Update user profile with extracted information
      await db.collection("users").doc(userId).update({
        skills: analysis.skills,
        education: analysis.education,
        experience: analysis.experience,
        projects: analysis.projects,
        updatedAt: new Date().toISOString(),
      });

      return {
        success: true,
        analysis,
      };
    }

    const prompt = `
    Analyze this CV/Resume and extract the following information in JSON format:
    
    CV Content: ${cvText}
    
    Please extract:
    1. skills: Array of technical and soft skills
    2. education: Education background summary
    3. experience: Work experience summary
    4. projects: Projects summary
    5. keywords: Important keywords for interview questions
    
    Return only valid JSON in this format:
    {
      "skills": ["skill1", "skill2"],
      "education": "education summary",
      "experience": "experience summary", 
      "projects": "projects summary",
      "keywords": ["keyword1", "keyword2"]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Parse the JSON response
    let analysis: CVAnalysisResult;
    try {
      analysis = JSON.parse(analysisText);
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        skills: extractSkillsFromText(cvText),
        education: "Education information extracted from CV",
        experience: "Experience information extracted from CV",
        projects: "Projects information extracted from CV",
        keywords: extractKeywordsFromText(cvText),
      };
    }

    // Update user profile with extracted information
    await db.collection("users").doc(userId).update({
      skills: analysis.skills,
      education: analysis.education,
      experience: analysis.experience,
      projects: analysis.projects,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("CV analysis error:", error);
    return {
      success: false,
      message: "Failed to analyze CV",
    };
  }
}

export async function generatePersonalizedQuestions(params: GenerateQuestionsParams) {
  const { userId, cvAnalysis, interviewType, difficulty, questionCount } = params;

  try {
    const model = await getAvailableModel();
    
    if (!model) {
      console.log("No AI model available, using fallback questions");
      // Use fallback questions
      const questionsData = {
        questions: generateFallbackQuestions(cvAnalysis, questionCount),
      };

      // Store questions in database
      const interviewDoc = await db.collection("interviews").add({
        userId,
        questions: questionsData.questions,
        type: interviewType,
        difficulty,
        createdAt: new Date().toISOString(),
        status: "pending",
      });

      return {
        success: true,
        interviewId: interviewDoc.id,
        questions: questionsData.questions,
      };
    }

    const prompt = `
    Generate ${questionCount} personalized interview questions based on this CV analysis:
    
    Skills: ${cvAnalysis.skills.join(", ")}
    Experience: ${cvAnalysis.experience}
    Projects: ${cvAnalysis.projects}
    Keywords: ${cvAnalysis.keywords.join(", ")}
    
    Interview Type: ${interviewType}
    Difficulty: ${difficulty}
    
    Generate questions in JSON format:
    {
      "questions": [
        {
          "id": "q1",
          "question": "question text",
          "type": "technical|behavioral|project|hr",
          "category": "category name",
          "difficulty": "easy|medium|hard",
          "timeLimit": 60,
          "basedOn": "what CV section this is based on"
        }
      ]
    }
    
    Mix different types of questions and make them specific to the candidate's background.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const questionsText = response.text();

    let questionsData;
    try {
      questionsData = JSON.parse(questionsText);
    } catch {
      // Fallback questions if parsing fails
      questionsData = {
        questions: generateFallbackQuestions(cvAnalysis, questionCount),
      };
    }

    // Store questions in database
    const interviewDoc = await db.collection("interviews").add({
      userId,
      questions: questionsData.questions,
      type: interviewType,
      difficulty,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    return {
      success: true,
      interviewId: interviewDoc.id,
      questions: questionsData.questions,
    };
  } catch (error) {
    console.error("Question generation error:", error);
    return {
      success: false,
      message: "Failed to generate questions",
    };
  }
}

// Helper functions
async function extractTextFromFile(arrayBuffer: ArrayBuffer): Promise<string> {
  // Simplified text extraction - in production, use libraries like pdf-parse or mammoth
  const decoder = new TextDecoder();
  const text = decoder.decode(arrayBuffer);
  
  // Basic text cleaning
  return text.replace(/[^\w\s\n\r\t.,;:!?()-]/g, "").substring(0, 5000);
}

function extractSkillsFromText(text: string): string[] {
  const commonSkills = [
    "JavaScript", "Python", "Java", "React", "Node.js", "HTML", "CSS",
    "SQL", "MongoDB", "Express", "Angular", "Vue", "TypeScript", "PHP",
    "C++", "C#", "Ruby", "Go", "Rust", "Swift", "Kotlin", "Flutter",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "Linux"
  ];
  
  return commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 10);
}

function extractKeywordsFromText(text: string): string[] {
  const words = text.toLowerCase().match(/\b\w{3,}\b/g) || [];
  const frequency: { [key: string]: number } = {};
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word);
}

function generateFallbackQuestions(cvAnalysis: CVAnalysisResult, count: number): PersonalizedQuestion[] {
  const skills = cvAnalysis.skills.length > 0 ? cvAnalysis.skills : ["programming", "problem solving", "teamwork"];
  
  const fallbackQuestions = [
    {
      id: "q1",
      question: "Tell me about yourself and your background.",
      type: "behavioral" as const,
      category: "General",
      difficulty: "easy" as const,
      timeLimit: 120,
      basedOn: "General background"
    },
    {
      id: "q2", 
      question: `I see you have experience with ${skills[0]}. Can you explain a project where you used this skill?`,
      type: "technical" as const,
      category: "Technical Skills",
      difficulty: "medium" as const,
      timeLimit: 180,
      basedOn: "Skills section"
    },
    {
      id: "q3",
      question: "What are your strengths and how do they relate to this role?",
      type: "behavioral" as const,
      category: "Self Assessment", 
      difficulty: "easy" as const,
      timeLimit: 90,
      basedOn: "General assessment"
    },
    {
      id: "q4",
      question: "Describe a challenging problem you solved and how you approached it.",
      type: "behavioral" as const,
      category: "Problem Solving",
      difficulty: "medium" as const,
      timeLimit: 150,
      basedOn: "Experience section"
    },
    {
      id: "q5",
      question: `How would you explain ${skills[1] || "a technical concept"} to someone without a technical background?`,
      type: "technical" as const,
      category: "Communication",
      difficulty: "medium" as const,
      timeLimit: 120,
      basedOn: "Skills section"
    },
    {
      id: "q6",
      question: "Why are you interested in this role and what motivates you?",
      type: "hr" as const,
      category: "Motivation",
      difficulty: "easy" as const,
      timeLimit: 90,
      basedOn: "General interest"
    },
    {
      id: "q7",
      question: "Describe a time when you had to work in a team. What was your role and contribution?",
      type: "behavioral" as const,
      category: "Teamwork",
      difficulty: "medium" as const,
      timeLimit: 150,
      basedOn: "Experience section"
    },
    {
      id: "q8",
      question: `What are the latest trends or developments in ${skills[0] || "technology"} that interest you?`,
      type: "technical" as const,
      category: "Industry Knowledge",
      difficulty: "hard" as const,
      timeLimit: 120,
      basedOn: "Skills section"
    },
    {
      id: "q9",
      question: "How do you handle stress and tight deadlines?",
      type: "behavioral" as const,
      category: "Stress Management",
      difficulty: "medium" as const,
      timeLimit: 90,
      basedOn: "General assessment"
    },
    {
      id: "q10",
      question: "Where do you see yourself in 5 years and how does this role fit into your career goals?",
      type: "hr" as const,
      category: "Career Goals",
      difficulty: "easy" as const,
      timeLimit: 120,
      basedOn: "Career planning"
    }
  ];
  
  return fallbackQuestions.slice(0, count);
}