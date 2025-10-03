import { Loading } from "@/components/common/loader"
import React, { Suspense } from "react"

import Product from "./components/product"

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Product />
    </Suspense>
  )
}

export default page
