import React from "react"

import { LoginForm } from "./components/login-form"
import WatchVerseLogo from "./components/watchverse-logo"

const LoginPage = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="mx-6 grid w-full max-w-4xl items-center gap-10 rounded-3xl bg-gray-100 p-6 md:grid-cols-2">
        <WatchVerseLogo />
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
