"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { changePasswordHandler } from "@/lib/api/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Enter Current Password",
  }),
  newPassword: z.string().min(2, {
    message: "Enter Current Password",
  }),
})

const ChangePassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordHandler,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }
  return (
    <div className="border-muted flex flex-col space-y-6 rounded-xl border p-4">
      <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          type="password"
          label="Current Password *"
          placeholder="Enter your current password"
          {...register("password")}
          error={errors?.password}
        />
        <Input
          type="password"
          label="New Password *"
          placeholder="Enter new password"
          {...register("newPassword")}
          error={errors?.newPassword}
        />
        <Button
          type="submit"
          className="ml-auto flex h-10 items-end justify-end text-lg"
          loader={isPending}
          disabled={isPending}
        >
          Change
        </Button>
      </form>
    </div>
  )
}

export default ChangePassword
