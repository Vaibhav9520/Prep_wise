import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import CVUploadForm from "@/components/CVUploadForm";

const CVUploadPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 py-12">
            <div className="max-w-3xl w-full">
                {/* Header Section */}
                <div className="text-center mb-12 fade-in">
                    <div className="inline-block mb-4">
                        <span className="badge badge-peach">Profile Setup</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
                        Upload Your CV
                    </h1>
                    <p className="text-lg text-midnight/70 max-w-2xl mx-auto">
                        Upload your CV to unlock personalized interview questions tailored to your skills and experience
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-fresh-green"></div>
                            </div>
                            <div className="font-semibold text-midnight">Tailored Questions</div>
                            <div className="text-sm text-midnight/60">Based on your skills</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-ocean-blue/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-ocean-blue"></div>
                            </div>
                            <div className="font-semibold text-midnight">Better Practice</div>
                            <div className="text-sm text-midnight/60">Relevant scenarios</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-warm-peach/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-warm-peach"></div>
                            </div>
                            <div className="font-semibold text-midnight">Career Growth</div>
                            <div className="text-sm text-midnight/60">Targeted improvement</div>
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <div className="slide-up">
                    <CVUploadForm userId={user.id} />
                </div>

                {/* Privacy Note */}
                <div className="text-center mt-8">
                    <p className="text-sm text-midnight/60">
                        Your CV is securely stored and only used to generate personalized interview questions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CVUploadPage;