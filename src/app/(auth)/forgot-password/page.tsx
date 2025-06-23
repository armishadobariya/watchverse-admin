import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import WatchVerseLogo from "@/components/auth/watchverse-logo"
import React from "react"

const LoginPage = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="mx-6 grid w-full max-w-4xl items-center gap-10 rounded-3xl bg-gray-100 p-6 md:grid-cols-2">
        <WatchVerseLogo />
        <ForgotPasswordForm />
      </div>
    </main>
  )
}

export default LoginPage
