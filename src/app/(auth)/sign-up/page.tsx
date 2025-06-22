import React from "react"

import WatchVerseLogo from "../login/components/watchverse-logo"
import { SignUpForm } from "./components/sign-up-form"

const SignUpPage = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="mx-6 grid w-full max-w-4xl items-center gap-10 rounded-3xl bg-gray-100 p-6 md:grid-cols-2">
        <WatchVerseLogo />
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage
