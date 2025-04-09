import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./change-password";
import AccountDetails from "./account-details";


const Profile = () => {
    return (
        <div className="justify-center w-full py-7 ">
            <Tabs defaultValue="account" className="max-w-2xl mx-auto justify-center">
                <TabsList className="w-full">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <AccountDetails />
                </TabsContent>
                <TabsContent value="password">
                    <ChangePassword />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Profile;
