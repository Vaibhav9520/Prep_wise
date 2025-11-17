import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="nav">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-fresh rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gradient">PlaceMate AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                        <a href="#testimonials" className="nav-link">Testimonials</a>
                        <a href="#pricing" className="nav-link">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="nav-link">Sign In</Link>
                        <Link href="/sign-up" className="btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section mt-16">
                <div className="hero-content">
                    <div className="space-y-8 fade-in">
                        <div className="inline-block">
                            <span className="badge badge-green">
                                🚀 AI-Powered Interview Practice
                            </span>
                        </div>

                        <h1 className="text-gradient">
                            Ace Your Next Interview with Confidence
                        </h1>

                        <p className="text-xl text-midnight/70 max-w-xl">
                            Practice with AI-powered mock interviews, get instant feedback, and land your dream job.
                            Personalized questions based on your CV and experience.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/sign-up" className="btn-primary">
                                Start Free Practice →
                            </Link>
                            <Link href="#how-it-works" className="btn-secondary">
                                See How It Works
                            </Link>
                        </div>

                        <div className="flex items-center gap-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-fresh-green">10,000+</div>
                                <div className="text-sm text-midnight/60">Interviews Completed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-ocean-blue">95%</div>
                                <div className="text-sm text-midnight/60">Success Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-warm-peach">4.9/5</div>
                                <div className="text-sm text-midnight/60">User Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative slide-up">
                        <div className="absolute inset-0 bg-gradient-fresh opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                            <Image
                                src="/robot.png"
                                alt="AI Interview Assistant"
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Rest of the sections... */}
            <section className="section text-center">
                <h2>More sections coming soon...</h2>
                <Link href="/sign-up" className="btn-primary mt-8">
                    Get Started Now
                </Link>
            </section>
        </div>
    );
}