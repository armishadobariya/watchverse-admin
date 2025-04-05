import React from "react";
import WatchVerseLogo from "./components/watchverse-logo";
import { LoginForm } from "./components/login-form";

const LoginPage = () => {
    return (
        <main className="flex h-screen items-center justify-center">
            <div className="grid grid-cols-2 gap-10 items-center bg-gray-100 max-w-4xl rounded-3xl w-full p-6">
                <WatchVerseLogo />
                <LoginForm />
            </div>
        </main>
    );
};

export default LoginPage;
