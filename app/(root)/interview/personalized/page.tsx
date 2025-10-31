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
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">AI-Powered Personalized Interview</h1>
                    <p className="text-gray-600">
                        Get interview questions tailored to your CV and experience
                    </p>
                </div>

                <PersonalizedInterviewForm user={user} />
            </div>
        </div>
    );
};

export default PersonalizedInterviewPage;