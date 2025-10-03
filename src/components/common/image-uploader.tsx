"use client"

import { Input } from "@/components/ui/input"
import { ImageUp, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface ImageUploaderProps {
  value?: string
  onChange: (file: File) => void
  multiSelect?: boolean
}

export default function ImageUploader({
  value,
  onChange,
  multiSelect,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [fileName, setFileName] = useState<string | null>(null)
  console.log("fileName: ", fileName)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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
        multiple={multiSelect}
      />

      {preview ? (
        <div className="relative w-full h-full">
          <X
            className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 z-10"
            onClick={(e) => {
              setPreview(null)
              e.stopPropagation()
            }}
          />
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
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
