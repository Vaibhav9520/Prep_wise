import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import PersonalizedInterviewForm from "@/components/PersonalizedInterviewForm";

const PersonalizedInterviewPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check if user has uploaded CV
    if (!user.cvURL) {
        redirect("/profile/cv-upload");
    }

    return (
        <div className="min-h-screen bg-gradient-soft p-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 fade-in">
                    <div className="inline-block mb-4">
                        <span className="badge badge-green">Personalized Experience</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
                        AI-Powered Personalized Interview
                    </h1>
                    <p className="text-lg text-midnight/70 max-w-2xl mx-auto">
                        Interview questions tailored to your CV, skills, and experience level
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-fresh-green"></div>
                            </div>
                            <div className="font-semibold text-midnight text-sm">CV-Based</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-ocean-blue/10 flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-ocean-blue"></div>
                            </div>
                            <div className="font-semibold text-midnight text-sm">Role-Specific</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-warm-peach/10 flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-warm-peach"></div>
                            </div>
                            <div className="font-semibold text-midnight text-sm">Smart Questions</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-fresh-green"></div>
                            </div>
                            <div className="font-semibold text-midnight text-sm">Detailed Feedback</div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="slide-up">
                    <PersonalizedInterviewForm user={user} />
                </div>
            </div>
        </div>
    );
};

export default PersonalizedInterviewPage;