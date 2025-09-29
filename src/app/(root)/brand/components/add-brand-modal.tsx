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
import { addBrandHandler } from "@/lib/api/brand"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

// Define your schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  image: z.string().min(1, { message: "This field has to be filled." }),
  icon: z.string().min(1, { message: "This field has to be filled." }),
})

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

const AddBrandModal = ({
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
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: initialData?.image || "",
      icon: initialData?.icon || "",
      name: initialData?.name || "",
    },
  })

  const queryClient = useQueryClient()

  // add brand handler
  const addBrandMutation = useMutation({
    mutationFn: (data: FormData) => addBrandHandler(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      setOpen(false)
      reset()
    },
  })

  // update brand handler
  //   const updateBrandMutation = useMutation({
  //     mutationFn: (data: { id: string; payload: FormData }) =>
  //       updateBrand(data.id, data.payload),
  //     onSuccess: (payload) => {
  //       queryClient.invalidateQueries({ queryKey: ["brands"] });
  //       toast.success(payload?.message);
  //       // onSuccess?.();
  //     },
  //     onError: (error) => {
  //       toast.error(error?.message);
  //     },
  //   });

  // form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    addBrandMutation.mutate(formData)
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
          <DialogTitle>Add Brand</DialogTitle>
          <DialogDescription>Add brand image, logo and name</DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-start gap-4 w-full">
                  <Label>Brand Image:</Label>
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
                  <Label>Brand Logo:</Label>
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
                  label="Brand Name *"
                  placeholder="Enter Brand Name"
                  {...register("name")}
                  error={errors.name}
                />
              </div>

              <div className="flex justify-end">
                {/* <Button
                type="submit"
                disabled={
                  isEditing
                    ? updateBrandMutation.isPending
                    : addBrandMutation.isPending
                }
                className="w-full h-11 text-base text-bronze uppercase font-semibold"
              >
                {(
                  isEditing
                    ? updateBrandMutation?.isPending
                    : addBrandMutation?.isPending
                )
                  ? "Saving..."
                  : isEditing
                  ? "Update Barnd"
                  : "Add Brand"}
              </Button> */}
                <Button
                  type="submit"
                  size={"lg"}
                  loader={addBrandMutation.isPending}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddBrandModal
