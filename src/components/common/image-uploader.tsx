"use client"

import { Input } from "@/components/ui/input"
import { ImageUp, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface ImageFile {
  file: File
  preview: string
}

// Overloaded interface for better type safety
interface ImageUploaderPropsMulti {
  value?: string
  onChange: (files: File[]) => void
  multiSelect: true
}

interface ImageUploaderPropsSingle {
  value?: string
  onChange: (file: File) => void
  multiSelect?: false
}

type ImageUploaderProps = ImageUploaderPropsMulti | ImageUploaderPropsSingle

export default function ImageUploader({
  value,
  onChange,
  multiSelect = false,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [previews, setPreviews] = useState<ImageFile[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (multiSelect) {
      // Handle multiple files
      const newImageFiles: ImageFile[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setPreviews((prev) => [...prev, ...newImageFiles])
      ;(onChange as (files: File[]) => void)(
        newImageFiles.map((img) => img.file),
      )
    } else {
      // Handle single file
      const file = files[0]
      const fileUrl = URL.createObjectURL(file)
      setPreview(fileUrl)
      ;(onChange as (file: File) => void)(file)
    }
  }

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()

    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)
    ;(onChange as (files: File[]) => void)(newPreviews.map((img) => img.file))

    // Revoke the URL to free memory
    URL.revokeObjectURL(previews[index].preview)
  }

  const handleRemoveSingle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // Multi-select view
  if (multiSelect) {
    return (
      <div className="space-y-4">
        <div className="flex items-center flex-wrap gap-4">
          {previews.map((imageFile, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg h-32 w-32 relative overflow-hidden"
            >
              <X
                className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10 hover:bg-gray-100"
                size={20}
                onClick={(e) => handleRemoveImage(index, e)}
              />
              <Image
                src={imageFile.preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {/* Upload button */}
          <div
            className="border border-dashed border-gray-300 rounded-lg h-32 w-32 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={handleClick}
          >
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple
            />
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageUp className="size-8 text-gray-300" />
              <span className="text-xs mt-2">Add Image</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Single select view
  return (
    <div
      className="border border-dashed border-gray-300 rounded-lg h-32 w-32 flex items-center justify-center cursor-pointer relative overflow-hidden hover:border-gray-400 transition-colors"
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
        <div className="relative w-full h-full">
          <X
            className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10 hover:bg-gray-100"
            size={20}
            onClick={handleRemoveSingle}
          />
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <ImageUp className="size-12 text-gray-200" />
          <span className="text-xs mt-2">Upload</span>
        </div>
      )}
    </div>
  )
}

// interface ImageUploaderProps {
//   value?: string | string[]
//   onChange: (file: File | File[]) => void
//   multiSelect?: boolean
// }

// export default function ImageUploader({
//   value,
//   onChange,
//   multiSelect = false,
// }: ImageUploaderProps) {
//   const [previews, setPreviews] = useState<string[]>(
//     value ? (Array.isArray(value) ? value : [value]) : [],
//   )
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (!files?.length) return

//     const fileArray = Array.from(files)
//     const newPreviews = fileArray?.map((file) => URL.createObjectURL(file))

//     if (multiSelect) {
//       setPreviews((prev) => [...prev, ...newPreviews])
//       onChange(fileArray)
//     } else {
//       setPreviews([newPreviews[0]])
//       onChange(fileArray[0])
//     }
//   }

//   const handleRemove = (index: number, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setPreviews((prev) => prev?.filter((_, i) => i !== index))
//   }

//   const handleClick = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div className="flex flex-wrap gap-2">
//       {previews?.map((preview, index) => (
//         <div
//           key={index}
//           className="border border-dashed border-gray-300 rounded-lg h-30 w-30 flex items-center justify-center relative overflow-hidden"
//         >
//           <X
//             className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10"
//             onClick={(e) => handleRemove(index, e)}
//           />
//           <Image
//             src={preview}
//             alt={`Preview ${index + 1}`}
//             fill
//             className="object-cover"
//           />
//         </div>
//       ))}

//       <div
//         className="border border-dashed border-gray-300 rounded-lg h-30 w-30 flex items-center justify-center cursor-pointer relative overflow-hidden"
//         onClick={handleClick}
//       >
//         <Input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           className="hidden"
//           accept="image/*"
//           multiple={multiSelect}
//         />
//         <div className="w-full h-full flex items-center justify-center text-gray-400">
//           <ImageUp className="size-12 text-gray-200" />
//         </div>
//       </div>
//     </div>
//   )
// }
