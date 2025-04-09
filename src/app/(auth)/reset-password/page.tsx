import React, { Suspense } from "react";
import WatchVerseLogo from "../login/components/watchverse-logo";
import ResetPasswordForm from "./components/reset-password-form";


const LoginPage = () => {
    return (
        <Suspense>
            <main className="flex h-screen items-center justify-center">
                <div className="grid md:grid-cols-2 gap-10 items-center bg-gray-100 max-w-4xl rounded-3xl w-full p-6 mx-6">
                    <WatchVerseLogo />
                    <ResetPasswordForm />
                </div>
            </main>
        </Suspense>
    );
};

export default LoginPage;
