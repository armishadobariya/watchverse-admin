import { Loading } from "@/components/common/loader"
import React, { Suspense } from "react"

import Category from "./components/category"

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Category />
    </Suspense>
  )
}

export default page
