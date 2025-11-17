import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || "",
  });

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block mb-4">
            <span className="badge badge-green">Interview Feedback</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
            <span className="capitalize">{interview.role}</span> Interview Results
          </h1>

          {/* Score Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto mt-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Overall Score */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gradient mb-2">
                  {feedback?.totalScore}
                </div>
                <div className="text-sm text-midnight/60 font-semibold">Overall Score</div>
              </div>

              <div className="hidden md:block w-px h-20 bg-midnight/10"></div>

              {/* Date */}
              <div className="text-center">
                <div className="flex items-center gap-2 text-midnight/70 mb-2">
                  <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
                  <span className="font-semibold">
                    {feedback?.createdAt
                      ? dayjs(feedback.createdAt).format("MMM D, YYYY")
                      : "N/A"}
                  </span>
                </div>
                <div className="text-sm text-midnight/60">
                  {feedback?.createdAt
                    ? dayjs(feedback.createdAt).format("h:mm A")
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Assessment */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 mb-8 slide-up">
          <h2 className="text-2xl font-bold text-midnight mb-4">Overall Assessment</h2>
          <p className="text-lg text-midnight/80 leading-relaxed">{feedback?.finalAssessment}</p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 mb-8 slide-up">
          <h2 className="text-2xl font-bold text-midnight mb-6">Performance Breakdown</h2>
          <div className="space-y-6">
            {feedback?.categoryScores?.map((category, index) => (
              <div key={index} className="bg-gradient-soft rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-midnight">
                    {index + 1}. {category.name}
                  </h3>
                  <span className="text-2xl font-bold text-gradient">
                    {category.score}/100
                  </span>
                </div>
                <p className="text-midnight/70">{category.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths and Improvements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 slide-up">
            <h2 className="text-2xl font-bold text-midnight mb-6">Strengths</h2>
            <ul className="space-y-3">
              {feedback?.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-fresh-green text-xl mt-1">✓</span>
                  <span className="text-midnight/80">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 slide-up">
            <h2 className="text-2xl font-bold text-midnight mb-6">Areas for Improvement</h2>
            <ul className="space-y-3">
              {feedback?.areasForImprovement?.map((area, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-ocean-blue text-xl mt-1">•</span>
                  <span className="text-midnight/80">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
          <Link href="/" className="btn-secondary text-center">
            Back to Dashboard
          </Link>
          <Link href={`/interview/${id}`} className="btn-primary text-center">
            Retake Interview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
