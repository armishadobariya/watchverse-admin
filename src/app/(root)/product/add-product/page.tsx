import Loader from "@/components/common/loader"
import React, { Suspense } from "react"

import { AddProductForm } from "./components/add-product-form"

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AddProductForm />
    </Suspense>
  )
}

export default page
