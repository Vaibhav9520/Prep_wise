"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { submitInterviewAnswer, generateDetailedFeedback } from "@/lib/actions/interview.action";

interface PersonalizedInterviewInterfaceProps {
    interview: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    user: User;
}

const PersonalizedInterviewInterface = ({ interview, user }: PersonalizedInterviewInterfaceProps) => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    // const [isRecording, setIsRecording] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);

    const questions: PersonalizedQuestion[] = (interview.questions || []) as PersonalizedQuestion[];
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        if (currentQuestion) {
            setTimeLeft(currentQuestion.timeLimit);
            setStartTime(Date.now());
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && currentQuestion) {
            handleNextQuestion();
        }
    }, [timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAnswerSubmit = async () => {
        if (!currentAnswer.trim()) {
            toast.error("Please provide an answer before proceeding");
            return;
        }

        const timeSpent = Math.floor((Date.now() - startTime) / 1000);

        const newAnswer: InterviewAnswer = {
            questionId: currentQuestion.id,
            answer: currentAnswer,
            timeSpent,
            timestamp: new Date().toISOString(),
        };

        // Submit answer to database
        await submitInterviewAnswer({
            interviewId: interview.id,
            questionId: currentQuestion.id,
            answer: currentAnswer,
            timeSpent,
        });

        setAnswers([...answers, newAnswer]);
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentAnswer("");
        } else {
            handleInterviewComplete();
        }
    };

    const handleInterviewComplete = async () => {
        setIsSubmitting(true);

        try {
            const result = await generateDetailedFeedback({
                interviewId: interview.id,
                userId: user.id,
                answers,
                questions,
            });

            if (result.success) {
                toast.success("Interview completed! Generating your feedback...");
                router.push(`/interview/feedback/${result.feedbackId}`);
            } else {
                toast.error("Failed to generate feedback");
            }
        } catch (error) {
            console.error("Error completing interview:", error);
            toast.error("Failed to complete interview");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Interview Completed!</h2>
                    <p>Generating your detailed feedback...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">AI Interview in Progress</h1>
                    <div className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary-200 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="card-border mb-6">
                <div className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${currentQuestion.type === 'technical' ? 'bg-blue-100 text-blue-800' :
                                    currentQuestion.type === 'behavioral' ? 'bg-green-100 text-green-800' :
                                        currentQuestion.type === 'project' ? 'bg-purple-100 text-purple-800' :
                                            'bg-orange-100 text-orange-800'
                                    }`}>
                                    {currentQuestion.type.toUpperCase()}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {currentQuestion.difficulty.toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{currentQuestion.question}</h2>
                            <p className="text-sm text-gray-600">
                                Based on: {currentQuestion.basedOn}
                            </p>
                        </div>

                        <div className="text-right">
                            <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-500' : 'text-primary-200'}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <div className="text-xs text-gray-500">Time Remaining</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Answer Input */}
            <div className="card-border mb-6">
                <div className="card p-6">
                    <h3 className="font-semibold mb-4">Your Answer</h3>

                    <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here... Be specific and provide examples where possible."
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                        disabled={isSubmitting}
                    />

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-600">
                            {currentAnswer.length} characters
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentAnswer("")}
                                disabled={isSubmitting}
                            >
                                Clear
                            </Button>

                            <Button
                                onClick={handleAnswerSubmit}
                                disabled={isSubmitting || !currentAnswer.trim()}
                                className="btn-primary"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Tips for this question:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    {currentQuestion.type === 'technical' && (
                        <>
                            <li>• Explain your thought process step by step</li>
                            <li>• Provide specific examples from your experience</li>
                            <li>• Mention relevant technologies and tools</li>
                        </>
                    )}
                    {currentQuestion.type === 'behavioral' && (
                        <>
                            <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                            <li>• Be specific about your role and contributions</li>
                            <li>• Highlight what you learned from the experience</li>
                        </>
                    )}
                    {currentQuestion.type === 'project' && (
                        <>
                            <li>• Describe the project scope and your role</li>
                            <li>• Explain challenges faced and how you solved them</li>
                            <li>• Mention technologies used and outcomes achieved</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PersonalizedInterviewInterface;