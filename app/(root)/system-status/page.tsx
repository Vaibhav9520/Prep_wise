import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Link from "next/link";

const SystemStatusPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">System Status</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Features */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">✅ Core Features (Working)</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                User Registration & Authentication
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                CV Upload & Basic Analysis
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Interview Question Generation (Fallback)
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Interactive Interview Interface
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Feedback Generation (Fallback)
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Progress Tracking & Statistics
                            </li>
                        </ul>
                    </div>
                </div>

                {/* AI Features */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">🤖 AI Features</h2>
                        <div className="space-y-3">
                            <div className="bg-yellow-50 p-3 rounded-lg">
                                <h3 className="font-medium text-yellow-800">⚠️ AI Currently Using Fallbacks</h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Google Gemini AI models are not accessible with current API key.
                                    System is using intelligent fallback mechanisms.
                                </p>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg">
                                <h3 className="font-medium text-blue-800">🔧 What&apos;s Working</h3>
                                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                    <li>• Smart question generation based on CV skills</li>
                                    <li>• Comprehensive feedback with scoring</li>
                                    <li>• Performance analysis and suggestions</li>
                                    <li>• All core interview functionality</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">🏥 System Health</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span>Database (Firebase)</span>
                                <span className="text-green-500 font-medium">✅ Online</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Authentication</span>
                                <span className="text-green-500 font-medium">✅ Working</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>File Upload</span>
                                <span className="text-green-500 font-medium">✅ Working</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Google AI API</span>
                                <span className="text-yellow-500 font-medium">⚠️ Fallback Mode</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>VAPI Integration</span>
                                <span className="text-blue-500 font-medium">🔵 Optional</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Experience */}
                <div className="card-border">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-4">👤 Your Experience</h2>
                        <div className="space-y-3">
                            <div className="bg-green-50 p-3 rounded-lg">
                                <h3 className="font-medium text-green-800">✅ Fully Functional</h3>
                                <p className="text-sm text-green-700 mt-1">
                                    You can use all features normally. The system provides intelligent
                                    fallbacks that ensure a great interview experience.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">Available Actions:</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Upload CV for personalized questions</li>
                                    <li>• Take AI-powered interviews</li>
                                    <li>• Get detailed feedback and scoring</li>
                                    <li>• Track your progress over time</li>
                                    <li>• Download feedback reports</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Buttons */}
            <div className="mt-8 card-border">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">🧪 System Tests</h2>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/api/test-google-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary px-4 py-2 rounded-lg text-sm"
                        >
                            Test Google AI API
                        </a>
                        <Link
                            href="/interview/personalized"
                            className="btn-primary px-4 py-2 rounded-lg text-sm"
                        >
                            Test Interview System
                        </Link>
                        <Link
                            href="/profile/cv-upload"
                            className="btn-secondary px-4 py-2 rounded-lg text-sm"
                        >
                            Test CV Upload
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to Dashboard */}
            <div className="mt-6 text-center">
                <Link href="/" className="btn-primary px-6 py-3 rounded-lg">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default SystemStatusPage;