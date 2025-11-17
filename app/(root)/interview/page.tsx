import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block mb-4">
            <span className="badge badge-blue">Quick Practice Mode</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
            Quick Practice Interview
          </h1>
          <p className="text-lg text-midnight/70 max-w-2xl mx-auto mb-6">
            Start an AI-powered interview session to practice your skills and receive instant feedback
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-fresh-green"></div>
              </div>
              <div className="font-semibold text-midnight">Instant Start</div>
              <div className="text-sm text-midnight/60">No setup required</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ocean-blue/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-ocean-blue"></div>
              </div>
              <div className="font-semibold text-midnight">AI Interviewer</div>
              <div className="text-sm text-midnight/60">Real-time conversation</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-warm-peach/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-warm-peach"></div>
              </div>
              <div className="font-semibold text-midnight">Quick Feedback</div>
              <div className="text-sm text-midnight/60">Instant results</div>
            </div>
          </div>
        </div>

        {/* Agent Component */}
        <div className="slide-up">
          <Agent
            userName={user?.name || ""}
            userId={user?.id}
            profileImage={user?.profileURL}
            type="generate"
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-midnight/60 mb-4">Want a more personalized experience?</p>
          <Link href="/interview/personalized" className="btn-accent">
            Try Personalized Interview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
