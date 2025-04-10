"use client";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ImageUploader = ({ className }: { className?: string }) => {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div
            className={`w-30 h-30 relative rounded-2xl overflow-hidden border border-dashed border-gray-300 hover:border-gray-500 transition, ${className}`}
        >
            <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full w-full"
                onChange={handleImageChange}
            />
            {image ? (
                <Image src={image} alt="Preview" fill className="object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageUp className="size-12 text-gray-200" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
