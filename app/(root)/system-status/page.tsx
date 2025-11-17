import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

const ProfileDashboardPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Get user's interviews for statistics
    const userInterviews = await getInterviewsByUserId(user.id);
    const totalInterviews = userInterviews?.length || 0;

    // Calculate statistics
    const userProfile = user as UserProfile;
    const averageScore = userProfile.averageScore || 0;
    const hasCV = !!user.cvURL;
    const skillsCount = user.skills?.length || 0;

    return (
        <div className="min-h-screen bg-gradient-soft py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 fade-in">
                    <div className="inline-block mb-4">
                        <span className="badge badge-green text-base px-6 py-3">Profile Dashboard</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
                        Welcome back, {user.name}
                    </h1>
                    <p className="text-lg text-midnight/70">
                        Monitor your interview performance and track your preparation progress
                    </p>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 slide-up">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Image & Basic Info */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block relative mb-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-fresh p-1">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        {user.profileURL ? (
                                            <Image
                                                src={user.profileURL}
                                                alt={user.name}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl font-bold text-gradient">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-fresh-green rounded-full flex items-center justify-center border-4 border-white">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-midnight mb-2">{user.name}</h2>
                            <p className="text-midnight/60 mb-4">{user.email}</p>
                            {user.contactNumber && (
                                <p className="text-midnight/60 text-sm">{user.contactNumber}</p>
                            )}
                        </div>

                        {/* Education Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-midnight mb-4">Education</h3>
                            <div className="space-y-3">
                                {user.collegeName && (
                                    <div>
                                        <div className="text-sm text-midnight/60">College</div>
                                        <div className="font-semibold text-midnight">{user.collegeName}</div>
                                    </div>
                                )}
                                {user.degree && (
                                    <div>
                                        <div className="text-sm text-midnight/60">Degree</div>
                                        <div className="font-semibold text-midnight">{user.degree}</div>
                                    </div>
                                )}
                                {user.branch && (
                                    <div>
                                        <div className="text-sm text-midnight/60">Branch</div>
                                        <div className="font-semibold text-midnight">{user.branch}</div>
                                    </div>
                                )}
                                {user.yearOfStudy && (
                                    <div>
                                        <div className="text-sm text-midnight/60">Year</div>
                                        <div className="font-semibold text-midnight">{user.yearOfStudy}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-midnight mb-4">Statistics</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-soft rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-fresh-green">{totalInterviews}</div>
                                    <div className="text-xs text-midnight/60">Interviews</div>
                                </div>
                                <div className="bg-gradient-soft rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-ocean-blue">{averageScore}%</div>
                                    <div className="text-xs text-midnight/60">Avg Score</div>
                                </div>
                                <div className="bg-gradient-soft rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-warm-peach">{skillsCount}</div>
                                    <div className="text-xs text-midnight/60">Skills</div>
                                </div>
                                <div className="bg-gradient-soft rounded-xl p-4 text-center">
                                    <div className="text-sm font-bold text-midnight">{hasCV ? "Active" : "Pending"}</div>
                                    <div className="text-xs text-midnight/60">CV Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Interviews */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-fresh-green"></div>
                            </div>
                            <div className="text-3xl font-bold text-gradient">{totalInterviews}</div>
                        </div>
                        <h3 className="font-semibold text-midnight">Total Interviews</h3>
                        <p className="text-sm text-midnight/60 mt-1">Completed sessions</p>
                    </div>

                    {/* Average Score */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-ocean-blue/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-ocean-blue"></div>
                            </div>
                            <div className="text-3xl font-bold text-gradient">{averageScore}%</div>
                        </div>
                        <h3 className="font-semibold text-midnight">Average Score</h3>
                        <p className="text-sm text-midnight/60 mt-1">Overall performance</p>
                    </div>

                    {/* Skills Tracked */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-warm-peach/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-warm-peach"></div>
                            </div>
                            <div className="text-3xl font-bold text-gradient">{skillsCount}</div>
                        </div>
                        <h3 className="font-semibold text-midnight">Skills Tracked</h3>
                        <p className="text-sm text-midnight/60 mt-1">From your CV</p>
                    </div>

                    {/* Profile Completion */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-fresh-green/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-fresh-green"></div>
                            </div>
                            <div className="text-3xl font-bold text-gradient">
                                {Math.round(((hasCV ? 1 : 0) + (user.collegeName ? 1 : 0) + (user.degree ? 1 : 0) + (skillsCount > 0 ? 1 : 0)) / 4 * 100)}%
                            </div>
                        </div>
                        <h3 className="font-semibold text-midnight">Profile Complete</h3>
                        <p className="text-sm text-midnight/60 mt-1">Setup progress</p>
                    </div>
                </div>

                {/* Skills Section */}
                {user.skills && user.skills.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 mb-8 slide-up">
                        <h2 className="text-2xl font-bold text-midnight mb-6">Your Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gradient-soft rounded-full text-midnight font-medium text-sm border border-fresh-green/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CV Status & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* CV Status */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 slide-up">
                        <h2 className="text-2xl font-bold text-midnight mb-6">CV Status</h2>
                        {hasCV ? (
                            <div className="space-y-4">
                                <div className="bg-green-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                                        <span>✓</span>
                                        <span>CV Uploaded</span>
                                    </div>
                                    <p className="text-sm text-green-600">
                                        Your CV is active and being used for personalized interview questions
                                    </p>
                                </div>
                                <Link href="/profile/cv-upload" className="btn-secondary w-full text-center block">
                                    Update CV
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-orange-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 text-orange-700 font-semibold mb-2">
                                        <span>!</span>
                                        <span>No CV Uploaded</span>
                                    </div>
                                    <p className="text-sm text-orange-600">
                                        Upload your CV to unlock personalized interview questions
                                    </p>
                                </div>
                                <Link href="/profile/cv-upload" className="btn-primary w-full text-center block">
                                    Upload CV Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 slide-up">
                        <h2 className="text-2xl font-bold text-midnight mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/interview/personalized" className="btn-primary w-full text-center block">
                                Start New Interview
                            </Link>
                            <Link href="/interview" className="btn-secondary w-full text-center block">
                                Quick Practice
                            </Link>
                            <Link href="/" className="btn-accent w-full text-center block">
                                View All Interviews
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Progress & Achievements */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 mb-8 slide-up">
                    <h2 className="text-2xl font-bold text-midnight mb-6">Your Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Beginner */}
                        <div className="text-center p-6 bg-gradient-soft rounded-2xl">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fresh-green/20 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full ${totalInterviews >= 1 ? 'bg-fresh-green' : 'bg-gray-300'}`}></div>
                            </div>
                            <h3 className="font-bold text-midnight mb-2">First Steps</h3>
                            <p className="text-sm text-midnight/60">Complete your first interview</p>
                            {totalInterviews >= 1 && (
                                <div className="mt-2 text-xs text-fresh-green font-semibold">Unlocked</div>
                            )}
                        </div>

                        {/* Intermediate */}
                        <div className="text-center p-6 bg-gradient-soft rounded-2xl">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-blue/20 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full ${totalInterviews >= 5 ? 'bg-ocean-blue' : 'bg-gray-300'}`}></div>
                            </div>
                            <h3 className="font-bold text-midnight mb-2">Getting Better</h3>
                            <p className="text-sm text-midnight/60">Complete 5 interviews</p>
                            {totalInterviews >= 5 ? (
                                <div className="mt-2 text-xs text-ocean-blue font-semibold">Unlocked</div>
                            ) : (
                                <div className="mt-2 text-xs text-midnight/60">{totalInterviews}/5 completed</div>
                            )}
                        </div>

                        {/* Expert */}
                        <div className="text-center p-6 bg-gradient-soft rounded-2xl">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warm-peach/20 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full ${totalInterviews >= 10 ? 'bg-warm-peach' : 'bg-gray-300'}`}></div>
                            </div>
                            <h3 className="font-bold text-midnight mb-2">Interview Pro</h3>
                            <p className="text-sm text-midnight/60">Complete 10 interviews</p>
                            {totalInterviews >= 10 ? (
                                <div className="mt-2 text-xs text-warm-peach font-semibold">Unlocked</div>
                            ) : (
                                <div className="mt-2 text-xs text-midnight/60">{totalInterviews}/10 completed</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center fade-in">
                    <Link href="/" className="btn-primary px-8 py-4 text-lg">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboardPage;
