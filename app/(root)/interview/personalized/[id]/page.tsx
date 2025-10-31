import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getPersonalizedInterview } from "@/lib/actions/interview.action";
import PersonalizedInterviewInterface from "@/components/PersonalizedInterviewInterface";

interface PersonalizedInterviewPageProps {
    params: Promise<{ id: string }>;
}

const PersonalizedInterviewPage = async ({ params }: PersonalizedInterviewPageProps) => {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const interview = await getPersonalizedInterview(id);

    if (!interview) {
        redirect("/interview/personalized");
    }

    return (
        <div className="min-h-screen">
            <PersonalizedInterviewInterface
                interview={interview}
                user={user}
            />
        </div>
    );
};

export default PersonalizedInterviewPage;