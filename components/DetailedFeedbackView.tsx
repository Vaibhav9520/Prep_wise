"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DetailedFeedbackViewProps {
    feedback: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    user: User;
}

const DetailedFeedbackView = ({ feedback, user }: DetailedFeedbackViewProps) => {
    const downloadPDF = () => {
        // Create PDF content
        const content = `
Interview Feedback Report
========================

Student: ${user.name}
Date: ${new Date(feedback.createdAt).toLocaleDateString()}

Overall Performance
==================
Overall Score: ${feedback.overallScore}/100
Communication: ${feedback.communicationScore}/100
Technical Skills: ${feedback.technicalScore}/100
Confidence: ${feedback.confidenceScore}/100

Strengths
=========
${feedback.strengths.map((s: string) => `• ${s}`).join('\n')}

Areas for Improvement
====================
${feedback.weaknesses.map((w: string) => `• ${w}`).join('\n')}

Detailed Analysis
================
${feedback.detailedAnalysis}

Improvement Suggestions
======================
${feedback.improvementSuggestions.map((s: string) => `• ${s}`).join('\n')}
    `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interview-feedback-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return "bg-green-100";
        if (score >= 60) return "bg-yellow-100";
        return "bg-red-100";
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Interview Feedback Report</h1>
                <p className="text-gray-600">
                    Detailed analysis of your interview performance
                </p>
                <p className="text-sm text-gray-500">
                    Completed on {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* Overall Score Card */}
            <div className="card-border mb-8">
                <div className="card p-6 text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(feedback.overallScore)}`}>
                        {feedback.overallScore}
                    </div>
                    <div className="text-xl text-gray-600 mb-4">Overall Score</div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className={`p-4 rounded-lg ${getScoreBg(feedback.communicationScore)}`}>
                            <div className={`text-2xl font-bold ${getScoreColor(feedback.communicationScore)}`}>
                                {feedback.communicationScore}
                            </div>
                            <div className="text-sm text-gray-600">Communication</div>
                        </div>

                        <div className={`p-4 rounded-lg ${getScoreBg(feedback.technicalScore)}`}>
                            <div className={`text-2xl font-bold ${getScoreColor(feedback.technicalScore)}`}>
                                {feedback.technicalScore}
                            </div>
                            <div className="text-sm text-gray-600">Technical Skills</div>
                        </div>

                        <div className={`p-4 rounded-lg ${getScoreBg(feedback.confidenceScore)}`}>
                            <div className={`text-2xl font-bold ${getScoreColor(feedback.confidenceScore)}`}>
                                {feedback.confidenceScore}
                            </div>
                            <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Strengths */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            ✅ Strengths
                        </h2>
                        <ul className="space-y-2">
                            {feedback.strengths.map((strength: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Areas for Improvement */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4 text-orange-700">
                            🎯 Areas for Improvement
                        </h2>
                        <ul className="space-y-2">
                            {feedback.weaknesses.map((weakness: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    <span>{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Detailed Analysis */}
            <div className="card-border mb-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">📊 Detailed Analysis</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {feedback.detailedAnalysis}
                    </p>
                </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="card-border mb-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">💡 Improvement Suggestions</h2>
                    <div className="space-y-3">
                        {feedback.improvementSuggestions.map((suggestion: string, index: number) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-blue-800">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            {feedback.categoryBreakdown && (
                <div className="card-border mb-8">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">📈 Performance by Category</h2>
                        <div className="space-y-4">
                            {Object.entries(feedback.categoryBreakdown).map(([category, score]) => (
                                <div key={category} className="flex items-center justify-between">
                                    <span className="capitalize font-medium">{category}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-200 h-2 rounded-full"
                                                style={{ width: `${Number(score)}%` }}
                                            />
                                        </div>
                                        <span className={`font-bold ${getScoreColor(Number(score))}`}>
                                            {Number(score)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    onClick={downloadPDF}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                >
                    📄 Download Report
                </Button>

                <Button asChild className="btn-secondary flex-1 sm:flex-none">
                    <Link href="/interview/personalized">
                        🔄 Take Another Interview
                    </Link>
                </Button>

                <Button asChild className="btn-primary flex-1 sm:flex-none">
                    <Link href="/">
                        🏠 Back to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default DetailedFeedbackView;