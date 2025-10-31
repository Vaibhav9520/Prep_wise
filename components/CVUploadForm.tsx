"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { uploadCV, analyzeCV } from "@/lib/actions/cv.action";

interface CVUploadFormProps {
    userId: string;
}

const CVUploadForm = ({ userId }: CVUploadFormProps) => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
            }
        }
    };

    const validateFile = (file: File): boolean => {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a PDF or Word document");
            return false;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("File size must be less than 5MB");
            return false;
        }

        return true;
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        setIsUploading(true);

        try {
            // Upload CV file
            const uploadResult = await uploadCV({ userId, file });

            if (!uploadResult.success) {
                toast.error(uploadResult.message || "Failed to upload CV");
                return;
            }

            // Analyze CV content
            const analysisResult = await analyzeCV({
                userId,
                cvText: uploadResult.extractedText || ""
            });

            if (!analysisResult.success) {
                toast.warning("CV uploaded successfully! AI analysis is temporarily unavailable, but you can still use the system with basic features.");
                router.push("/");
                return;
            }

            toast.success("CV uploaded and analyzed successfully!");
            router.push("/");

        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload CV. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="card-border">
            <div className="card p-8">
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                        ? "border-primary-200 bg-primary-200/10"
                        : "border-gray-300 hover:border-primary-200"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-primary-200/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-primary-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>

                        {file ? (
                            <div className="text-center">
                                <p className="font-medium text-green-600">✓ {file.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-lg font-medium">
                                    Drag and drop your CV here, or click to browse
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Supports PDF, DOC, and DOCX files (max 5MB)
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="cv-upload"
                        />

                        <label
                            htmlFor="cv-upload"
                            className="btn-secondary cursor-pointer inline-block px-6 py-2 rounded-lg"
                        >
                            Browse Files
                        </label>
                    </div>
                </div>

                {file && (
                    <div className="mt-6 flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={() => setFile(null)}
                            disabled={isUploading}
                        >
                            Remove File
                        </Button>

                        <Button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="btn-primary"
                        >
                            {isUploading ? "Uploading..." : "Upload & Analyze CV"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVUploadForm;