import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getDetailedFeedback } from "@/lib/actions/interview.action";
import DetailedFeedbackView from "@/components/DetailedFeedbackView";

interface DetailedFeedbackPageProps {
    params: Promise<{ id: string }>;
}

const DetailedFeedbackPage = async ({ params }: DetailedFeedbackPageProps) => {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const feedback = await getDetailedFeedback(id);

    if (!feedback) {
        redirect("/");
    }

    return (
        <div className="min-h-screen p-4">
            <DetailedFeedbackView feedback={feedback} user={user} />
        </div>
    );
};

export default DetailedFeedbackPage;