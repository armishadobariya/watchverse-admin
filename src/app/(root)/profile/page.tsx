import Profile from "@/components/profile/profile"
import React, { Suspense } from "react"

const ProfilePage = () => {
  return (
    <Suspense fallback="loading..">
      <main>
        <Profile />
      </main>
    </Suspense>
  )
}

export default ProfilePage
