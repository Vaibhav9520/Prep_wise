"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generatePersonalizedQuestions } from "@/lib/actions/cv.action";

interface PersonalizedInterviewFormProps {
    user: User;
}

const PersonalizedInterviewForm = ({ user }: PersonalizedInterviewFormProps) => {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        interviewType: "mixed" as "technical" | "hr" | "mixed",
        difficulty: "medium" as "easy" | "medium" | "hard",
        questionCount: 8,
    });

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            // Create CV analysis from user data
            const cvAnalysis = {
                skills: user.skills || [],
                education: user.education || "",
                experience: user.experience || "",
                projects: user.projects || "",
                keywords: user.skills || [],
            };

            const result = await generatePersonalizedQuestions({
                userId: user.id,
                cvAnalysis,
                interviewType: formData.interviewType,
                difficulty: formData.difficulty,
                questionCount: formData.questionCount,
            });

            if (!result.success) {
                toast.error("AI question generation is temporarily unavailable. Please try the regular interview mode or try again later.");
                // Redirect to regular interview as fallback
                router.push("/interview");
                return;
            }

            toast.success("Personalized interview questions generated!");
            router.push(`/interview/personalized/${result.interviewId}`);

        } catch (error) {
            console.error("Generation error:", error);
            toast.error("Failed to generate interview. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Profile Summary */}
            <div className="card-border">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Profile Summary</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Personal Details</h3>
                            <p className="text-sm text-gray-600">
                                {user.name} • {user.degree} {user.branch} • {user.yearOfStudy}
                            </p>
                            <p className="text-sm text-gray-600">{user.collegeName}</p>
                        </div>

                        {user.skills && user.skills.length > 0 && (
                            <div>
                                <h3 className="font-medium text-gray-700">Skills</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user.skills.slice(0, 8).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-primary-200/20 text-primary-200 rounded text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {user.skills.length > 8 && (
                                        <span className="text-sm text-gray-500">
                                            +{user.skills.length - 8} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="text-sm text-gray-600">
                            <p>📄 CV Status: {user.cvURL ? "✅ Uploaded" : "❌ Not uploaded"}</p>
                            <p>🎯 Total Interviews: {(user as UserProfile).totalInterviews || 0}</p>
                            {(user as UserProfile).averageScore && (
                                <p>📊 Average Score: {(user as UserProfile).averageScore}%</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interview Configuration */}
            <div className="card-border">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">Interview Configuration</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Interview Type
                            </label>
                            <select
                                value={formData.interviewType}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    interviewType: e.target.value as "technical" | "hr" | "mixed"
                                })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                            >
                                <option value="mixed">Mixed (Technical + HR)</option>
                                <option value="technical">Technical Only</option>
                                <option value="hr">HR/Behavioral Only</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Difficulty Level
                            </label>
                            <select
                                value={formData.difficulty}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    difficulty: e.target.value as "easy" | "medium" | "hard"
                                })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                            >
                                <option value="easy">Easy (Beginner)</option>
                                <option value="medium">Medium (Intermediate)</option>
                                <option value="hard">Hard (Advanced)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Number of Questions
                            </label>
                            <select
                                value={formData.questionCount}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    questionCount: parseInt(e.target.value)
                                })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent"
                            >
                                <option value={5}>5 Questions (15 mins)</option>
                                <option value={8}>8 Questions (25 mins)</option>
                                <option value={10}>10 Questions (30 mins)</option>
                            </select>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium text-blue-800 mb-2">What to Expect:</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Questions based on your CV and skills</li>
                                <li>• {formData.questionCount} questions with time limits</li>
                                <li>• Voice or text responses supported</li>
                                <li>• Detailed AI feedback after completion</li>
                                <li>• Performance scoring and improvement tips</li>
                            </ul>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full btn-primary"
                        >
                            {isGenerating ? "Generating Questions..." : "Start Personalized Interview"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalizedInterviewForm;