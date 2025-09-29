"use client"

import { Input } from "@/components/ui/input"
import { ImageUp } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface ImageUploaderProps {
  value?: string
  onChange: (file: File) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [fileName, setFileName] = useState<string | null>(null)

  // console.log("preview: ", preview);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    console.log("file: ", file?.name)

    // Create preview URL
    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)
    setFileName(file.name)

    onChange(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    // <div>
    <div
      className="border border-dashed border-gray-300 rounded-lg h-30 w-30 flex items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={handleClick}
    >
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {preview ? (
        <Image src={preview} alt="Preview" fill className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <ImageUp className="size-12 text-gray-200" />
        </div>
      )}
    </div>
    // {fileName && (
    //   <div className="text-xs text-gray-500 truncate max-w-full">
    //     {fileName} <DeleteIcon />
    //   </div>
    // )}
    // </div>
  )
}
