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
import queryKeyFactory from "@/utils/queryKeyFactory"
import { productSchema } from "@/utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

export const AddProductForm = () => {
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      thumbnail: "",
      productModel: "",
      category: [],
      brand: "",
      price: 0,
      dummyPrice: 0,
      stock: 0,
      warranty: 0,
    },
  })

  const handleImageUpload = (file: File) => {
    console.log("file: ", file)
  }

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

  // form submit handler
  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values)
    console.log("form submitted")
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
              <Textarea
                className={`${errors.description ? "border-2 border-red" : ""}`}
                placeholder="Enter Product Description"
                value={""}
                onChange={(e) => setValue("description", e.target.value)}
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
                    value={field.value}
                    onChange={(files) => handleImageUpload(files)}
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
                    onChange={(file) => handleImageUpload(file)}
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
                <MultiSelect
                  options={categories || []}
                  onValueChange={(value) => setValue("category", value)}
                  placeholder="Select categories"
                  variant="inverted"
                  maxCount={3}
                  className={`${errors.category ? "border-2 border-red" : "normal-case"}`}
                  modalPopover
                />
                <span className="text-sm text-red mt-1 ml-[2px]">
                  {errors?.category?.message}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="b4-medium text-main">Brand *</Label>
              <Select>
                <SelectTrigger
                  className={`w-full ${errors.brand ? "border-2 border-red-500" : ""}, h-12`}
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
              {...register("warranty", { valueAsNumber: true })}
              error={errors.warranty}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size={"lg"}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
