import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import CVUploadForm from "@/components/CVUploadForm";

const CVUploadPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Upload Your CV</h1>
                    <p className="text-gray-600">
                        Upload your CV to get personalized interview questions based on your skills and experience.
                    </p>
                </div>

                <CVUploadForm userId={user.id} />
            </div>
        </div>
    );
};

export default CVUploadPage;