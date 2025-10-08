import { z } from "zod"

//  category and brand schema for form validation
export const categoryBrandSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  image: z.string().min(1, { message: "This field has to be filled." }),
  icon: z.string().min(1, { message: "This field has to be filled." }),
})

// Product schema for form validation
export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),

  description: z.string().min(1, { message: "Description is required." }),

  image: z
    .array(z.string())
    .min(1, { message: "At least one image must be uploaded." }),

  thumbnail: z.string().min(1, { message: "Thumbnail is required." }),

  productModel: z.string().min(1, { message: "Product model is required." }),

  category: z
    .array(z.string())
    .min(1, { message: "At least one category must be selected." }),

  brand: z.string().min(1, { message: "Brand is required." }),

  price: z
    .number()
    .min(1, { message: "Price is required." })
    .int({ message: "Price must be in a number." }),

  dummyPrice: z
    .number()
    .min(1, { message: "Dummy price is required." })
    .int({ message: "Dummy price must be in a number." }),

  stock: z
    .number()
    .min(1, { message: "stock is required." })
    .int({ message: "stock must be in a number." }),

  warranty: z.string().min(1, { message: "warranty is required." }),
})

export type ProductFormData = z.infer<typeof productSchema>
