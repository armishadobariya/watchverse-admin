import ResetPasswordForm from "@/components/auth/reset-password-form"
import WatchVerseLogo from "@/components/auth/watchverse-logo"
import React, { Suspense } from "react"

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex h-screen items-center justify-center">
        <div className="mx-6 grid w-full max-w-4xl items-center gap-10 rounded-3xl bg-gray-100 p-6 md:grid-cols-2">
          <WatchVerseLogo />
          <ResetPasswordForm />
        </div>
      </main>
    </Suspense>
  )
}

export default LoginPage
