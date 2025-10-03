import Loader from "@/components/common/loader"
import React, { Suspense } from "react"

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>edit Product page</div>
    </Suspense>
  )
}

export default page
