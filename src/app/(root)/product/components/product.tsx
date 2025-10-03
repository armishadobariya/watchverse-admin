"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

import AddProductPageRoute from "../add-product/route.info"

const Product = () => {
  const router = useRouter()
  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant={"outline"}
          onClick={() => router.push(AddProductPageRoute.navigate())}
        >
          Add Product
        </Button>
      </div>
    </div>
  )
}

export default Product
