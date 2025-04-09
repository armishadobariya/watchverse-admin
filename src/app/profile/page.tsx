import React, { Suspense } from "react";
import Profile from "./components/profile";

const ProfilePage = () => {
    return (
        <Suspense fallback="loading..">
            <main>
                <Profile />
            </main>
        </Suspense>
    );
};

export default ProfilePage;
