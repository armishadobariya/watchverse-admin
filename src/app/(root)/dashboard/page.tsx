import React, { Suspense } from "react"

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page",
}
const page = () => {
  return (
    <Suspense fallback="dashboard page loading">
      <div>Dashboard page</div>
    </Suspense>
  )
}

export default page
