export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-light-mint"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-fresh-green border-t-transparent animate-spin"></div>
                </div>
                <p className="text-midnight/60 font-medium">Loading...</p>
            </div>
        </div>
    );
}