"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploaderProps {
    value?: string;
    onChange: (file: File) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview URL
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);

        // Pass the file to parent component
        onChange(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg h-48 w-full flex items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={handleClick}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <div className="text-center p-4">
                        <p className="text-sm text-gray-500">
                            Click to upload an image
                        </p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleClick}
            >
                {preview ? "Change Image" : "Upload Image"}
            </Button>
        </div>
    );
}