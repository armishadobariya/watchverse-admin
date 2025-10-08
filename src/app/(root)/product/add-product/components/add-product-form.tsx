"use client"

import ImageUploader from "@/components/common/image-uploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getBrandsHandler } from "@/lib/api/brand"
import { getCategoryHandler } from "@/lib/api/category"
import { addProductHandler } from "@/lib/api/product"
import queryKeyFactory from "@/utils/queryKeyFactory"
import { productSchema } from "@/utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

export const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      image: [],
      thumbnail: "",
      productModel: "",
      category: [],
      brand: "",
      price: 0,
      dummyPrice: 0,
      stock: 0,
      warranty: "",
    },
  })

  const cachedData = queryClient.getQueryData(queryKeyFactory.brandList(""))

  const { data } = useQuery({
    queryKey: queryKeyFactory.brandList(""),
    queryFn: () => getBrandsHandler(""),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !cachedData,
  })

  const brands = data?.map((brand) => ({ id: brand._id, label: brand.name }))

  const { data: categoryData } = useQuery({
    queryKey: queryKeyFactory.categoryList(""),
    queryFn: () => getCategoryHandler(""),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !cachedData,
  })

  const categories = categoryData?.map((category) => ({
    value: category._id,
    label: category.name,
  }))

  // add product handler
  const addProductMutation = useMutation({
    mutationFn: (data: FormData) => addProductHandler(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory?.productList(),
      })
      reset()
      setImageFiles([])
      setThumbnailFile(null)
    },
  })

  // Handle file uploads from ImageUploader
  const handleImageUpload = (files: File[]) => {
    setImageFiles(files)
    // Set preview URLs for form validation
    const imageUrls = files?.map((file) => URL?.createObjectURL(file))
    setValue("image", imageUrls)
  }

  const handleThumbnailUpload = (file: File) => {
    setThumbnailFile(file)
    // Set preview URL for form validation
    setValue("thumbnail", URL?.createObjectURL(file))
  }

  // form submit handler
  function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = new FormData()

    formData.append("name", values.name.trim())
    formData.append("description", values.description.trim())
    formData.append("productModel", values.productModel.trim())
    formData.append("brand", values.brand)
    formData.append("price", String(values.price))
    formData.append("dummyPrice", String(values.dummyPrice))
    formData.append("stock", String(values.stock))
    formData.append("warranty", values.warranty)

    //  Append categories with indexed keys like category[0], category[1]
    values.category.forEach((catId, index) => {
      formData.append(`category[${index}]`, catId)
    })

    //  Append product images (multiple)
    imageFiles.forEach((file) => {
      formData.append("image", file)
    })

    //  Append single thumbnail
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile)
    }

    addProductMutation.mutate(formData)
  }

  return (
    <div className=" max-w-4xl mx-auto flex justify-center items-center">
      <div className="w-full space-y-10">
        <h2 className="text-xl font-semibold text-main">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="text"
            label="Product Name *"
            placeholder="Enter Product Name"
            {...register("name")}
            error={errors.name}
          />

          <div className="space-y-2">
            <Label className="b4-medium text-main">Description *</Label>
            <div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    className={`${errors.description ? "border-2 border-red" : ""}`}
                    placeholder="Enter Product Description"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <span className="text-sm text-red mt-1 ml-[2px]">
                {errors.description?.message}
              </span>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <Label>Product Images *</Label>
            <div>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value?.[0]}
                    onChange={(files: File[]) => handleImageUpload(files)}
                    multiSelect={true}
                  />
                )}
              />
              <span className="text-sm text-red mt-1 ml-[2px]">
                {errors?.image?.message}
              </span>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <Label>Thumbnail *</Label>
            <div>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={(file: File) => handleThumbnailUpload(file)}
                  />
                )}
              />
              <span className="text-sm text-red mt-1 ml-[2px]">
                {errors?.thumbnail?.message}
              </span>
            </div>
          </div>

          <Input
            type="text"
            label="Product Modal *"
            placeholder="Enter Product Modal"
            {...register("productModel")}
            error={errors.productModel}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="b4-medium text-main-text">Category *</Label>
              <div>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={categories || []}
                      onValueChange={(value) => {
                        field.onChange(value)
                      }}
                      defaultValue={field.value}
                      placeholder="Select categories"
                      variant="inverted"
                      maxCount={3}
                      className={`${errors.category ? "border-2 border-red" : "normal-case"}`}
                      modalPopover
                    />
                  )}
                />
                <span className="text-sm text-red mt-1 ml-[2px]">
                  {errors?.category?.message}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="b4-medium text-main">Brand *</Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${errors.brand ? "border-2 border-red-500" : ""} h-12`}
                    >
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands?.map((brand) => (
                        <SelectItem key={brand?.id} value={brand?.id}>
                          {brand?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.brand?.message && (
                <span className="text-sm text-red-500 mt-1 ml-[2px]">
                  {errors.brand.message}
                </span>
              )}
            </div>

            <Input
              label="Price *"
              placeholder="Enter Product Price"
              {...register("price", { valueAsNumber: true })}
              error={errors.price}
            />
            <Input
              label="Dummy Price *"
              placeholder="Enter Product Dummy Price"
              {...register("dummyPrice", { valueAsNumber: true })}
              error={errors.dummyPrice}
            />
          </div>

          <div className="w-1/2 space-y-8">
            <Input
              label="Stock *"
              placeholder="Enter Product stock"
              {...register("stock", { valueAsNumber: true })}
              error={errors.stock}
            />
            <Input
              label="Warranty (In months) *"
              placeholder="Enter Product warranty"
              {...register("warranty")}
              error={errors.warranty}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size={"lg"}
              loader={addProductMutation?.isPending}
              disabled={addProductMutation?.isPending}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
