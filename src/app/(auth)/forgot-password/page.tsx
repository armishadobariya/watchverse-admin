import React from "react";
import WatchVerseLogo from "../login/components/watchverse-logo";
import ForgotPasswordForm from "./components/forgot-password-form";


const LoginPage = () => {
    return (
        <main className="flex h-screen items-center justify-center">
            <div className="grid md:grid-cols-2 gap-10 items-center bg-gray-100 max-w-4xl rounded-3xl w-full p-6 mx-6">
                <WatchVerseLogo />
                <ForgotPasswordForm />
            </div>
        </main>
    );
};

export default LoginPage;

