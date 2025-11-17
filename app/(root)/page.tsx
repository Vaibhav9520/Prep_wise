import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id || ""),
    getLatestInterviews({ userId: user?.id || "" }),
  ]);

  const hasPastInterviews = (userInterviews?.length || 0) > 0;
  const hasUpcomingInterviews = (allInterview?.length || 0) > 0;

  return (
    <div className="min-h-screen bg-gradient-soft px-4 py-8">
      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 fade-in">
              <div className="inline-block">
                <span className="badge badge-green text-base px-6 py-3">
                  Welcome back, {user?.name}
                </span>
              </div>

              <h1 className="slide-up text-4xl md:text-5xl">
                Master Your Interviews with{" "}
                <span className="text-gradient">AI Confidence</span>
              </h1>

              <p className="text-xl text-midnight/70 max-w-2xl">
                Practice with AI-powered mock interviews, receive instant personalized feedback,
                and build the confidence you need to land your dream job.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/interview/personalized" className="btn-primary text-center">
                  Start AI Interview
                </Link>
                <Link href="/interview" className="btn-secondary text-center">
                  Quick Practice
                </Link>
              </div>

              {/* User Stats */}
              {user && (
                <div className="bg-gradient-to-br from-fresh-green/10 to-ocean-blue/10 backdrop-blur-sm rounded-2xl p-6 mt-6 border border-fresh-green/20">
                  <h3 className="font-semibold mb-4 text-lg">Your Progress</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-sm text-midnight/60 mb-1">Total Interviews</div>
                      <div className="text-2xl font-bold text-fresh-green">{(user as UserProfile).totalInterviews || 0}</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-sm text-midnight/60 mb-1">Average Score</div>
                      <div className="text-2xl font-bold text-ocean-blue">{(user as UserProfile).averageScore || 0}%</div>
                    </div>
                  </div>
                  {!user.cvURL && (
                    <div className="mt-4">
                      <Button asChild size="sm" className="btn-peach w-full">
                        <Link href="/profile/cv-upload">Upload CV for Personalized Questions</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative scale-in">
              <div className="absolute inset-0 bg-gradient-fresh opacity-20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
                <Image
                  src="/robot.png"
                  alt="AI Interview Assistant"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="max-w-7xl mx-auto mb-12 fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-fresh rounded-full"></div>
          <h2 className="text-3xl font-bold">Your Interviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role || ""}
                type={interview.type || ""}
                techstack={interview.techstack || []}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/50">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fresh-green/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-fresh-green"></div>
                </div>
                <p className="text-xl text-midnight/70 mb-6">You haven&apos;t taken any interviews yet</p>
                <Link href="/interview/personalized" className="btn-primary">
                  Start Your First Interview
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Available Interviews Section */}
      <section className="max-w-7xl mx-auto mb-12 fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-fresh rounded-full"></div>
          <h2 className="text-3xl font-bold">Practice Interviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role || ""}
                type={interview.type || ""}
                techstack={interview.techstack || []}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/50">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-ocean-blue/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-blue"></div>
                </div>
                <p className="text-xl text-midnight/70 mb-6">No practice interviews available right now</p>
                <Link href="/interview/personalized" className="btn-primary">
                  Create Personalized Interview
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;