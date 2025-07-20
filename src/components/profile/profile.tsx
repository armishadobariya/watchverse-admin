import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

import AccountDetails from "./partials/account-details"
import ChangePassword from "./partials/change-password"

const Profile = () => {
  return (
    <div className="w-full justify-center py-7">
      <Tabs defaultValue="account" className="mx-auto max-w-2xl justify-center">
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
  )
}

export default Profile
