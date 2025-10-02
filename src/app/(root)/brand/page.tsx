import { Loading } from "@/components/common/loader"
import React, { Suspense } from "react"

import Brand from "./components/brand"

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Brand />
    </Suspense>
  )
}

export default page
