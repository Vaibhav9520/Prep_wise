interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role?: string;
  level?: string;
  questions: string[] | PersonalizedQuestion[];
  techstack?: string[];
  createdAt?: string;
  userId?: string;
  type?: string;
  finalized?: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
  profileURL?: string;
  contactNumber?: string;
  collegeName?: string;
  degree?: string;
  branch?: string;
  yearOfStudy?: string;
  cvURL?: string;
  skills?: string[];
  education?: string;
  experience?: string;
  projects?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
  profileImage?: string;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
  contactNumber?: string;
  collegeName?: string;
  degree?: string;
  branch?: string;
  yearOfStudy?: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}

interface CVUploadParams {
  userId: string;
  file: File;
}

interface CVAnalysisResult {
  skills: string[];
  education: string;
  experience: string;
  projects: string;
  keywords: string[];
}

interface PersonalizedQuestion {
  id: string;
  question: string;
  type: "technical" | "behavioral" | "project" | "hr";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number; // in seconds
  basedOn: string; // what CV section this is based on
}

interface InterviewAnswer {
  questionId: string;
  answer: string;
  timeSpent: number;
  timestamp: string;
  confidence?: number;
}

interface DetailedFeedback {
  id: string;
  userId?: string;
  interviewId?: string;
  overallScore: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  detailedAnalysis: string;
  improvementSuggestions: string[];
  answers?: InterviewAnswer[];
  createdAt: string;
  categoryBreakdown?: { [key: string]: number };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  collegeName: string;
  degree: string;
  branch: string;
  yearOfStudy: string;
  profileImage?: string;
  cvURL?: string;
  skills: string[];
  totalInterviews: number;
  averageScore: number;
  lastInterviewDate?: string;
}

interface CVProcessingParams {
  userId: string;
  cvText: string;
}

interface GenerateQuestionsParams {
  userId: string;
  cvAnalysis: CVAnalysisResult;
  interviewType: "technical" | "hr" | "mixed";
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
}
