"use client"

import ImageUploader from "@/components/common/image-uploader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addCategoryHandler, updateCategoryHandler } from "@/lib/api/category"
import queryKeyFactory from "@/utils/queryKeyFactory"
import { categoryBrandSchema } from "@/utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

export interface AddEntityFormProps {
  initialData?: {
    _id: string
    name: string
    image: string
    icon: string
  }
  onSuccess?: () => void
  isEditing?: boolean
  children: React.ReactNode
}

const AddCategoryModal = ({
  initialData,
  isEditing = false,
  children,
}: AddEntityFormProps) => {
  const [open, setOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof categoryBrandSchema>>({
    resolver: zodResolver(categoryBrandSchema),
    defaultValues: {
      image: initialData?.image || "",
      icon: initialData?.icon || "",
      name: initialData?.name || "",
    },
  })

  const queryClient = useQueryClient()

  // add category handler
  const addCategoryMutation = useMutation({
    mutationFn: (data: FormData) => addCategoryHandler(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory?.categoryList(),
      })
      setOpen(false)
      reset()
    },
  })

  // update category handler
  const updateCategoryMutation = useMutation({
    mutationFn: (data: { id: string; payload: FormData }) =>
      updateCategoryHandler(data?.id, data?.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory?.categoryList(),
      })
      setOpen(false)
    },
  })

  // form submit handler
  async function onSubmit(values: z.infer<typeof categoryBrandSchema>) {
    const formData = new FormData()
    formData.append("name", values.name)

    // Handle image and icon files
    if (imageFile) {
      formData.append("image", imageFile)
    } else if (initialData?.image && !isEditing) {
      formData.append("image", initialData.image)
    }

    if (iconFile) {
      formData.append("icon", iconFile)
    } else if (initialData?.icon && !isEditing) {
      formData.append("icon", initialData.icon)
    }
    if (isEditing && initialData?._id) {
      updateCategoryMutation.mutate({
        id: initialData?._id,
        payload: formData,
      })
    } else {
      addCategoryMutation.mutate(formData)
    }
  }

  // Handle file uploads from ImageUploader
  const handleImageUpload = (file: File) => {
    setImageFile(file)
    setValue("image", URL.createObjectURL(file))
  }

  const handleIconUpload = (file: File) => {
    setIconFile(file)
    setValue("icon", URL.createObjectURL(file))
  }

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit category" : "Add category"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edit a category name, image and logo"
              : "Add a new category name, image and logo"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-10 mt-4">
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-start gap-4 w-full">
                  <Label>Category Image:</Label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={(file) => handleImageUpload(file)}
                      />
                    )}
                  />
                </div>
                <div className="flex items-start gap-4 w-full">
                  <Label>Category Logo:</Label>
                  <Controller
                    name="icon"
                    control={control}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={(file) => handleIconUpload(file)}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  label="Category Name *"
                  placeholder="Enter Category Name"
                  {...register("name")}
                  error={errors.name}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    isEditing
                      ? updateCategoryMutation.isPending
                      : addCategoryMutation.isPending
                  }
                  className=" h-11 text-base uppercase"
                  loader={
                    isEditing
                      ? updateCategoryMutation.isPending
                      : addCategoryMutation.isPending
                  }
                >
                  {isEditing ? "Save changes" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryModal
