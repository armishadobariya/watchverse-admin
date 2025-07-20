"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { editProfileHandler, getProfileHandler } from "@/lib/api/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UserCircle2Icon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { optional, z } from "zod"

// Define your schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNo: optional(z.string()),
})

const AccountDetails = () => {
  // Get profile data
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileHandler,
  })

  // Edit profile mutation
  const { mutate, isPending } = useMutation({
    mutationFn: editProfileHandler,
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username || "",
      email: profile?.email || "",
      phoneNo: profile?.phoneNo || "",
    },
    values: profile
      ? {
          username: profile.username || "",
          email: profile.email || "",
          phoneNo: profile.phoneNo || "",
        }
      : undefined,
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  if (isLoading) {
    return <div>Loading profile data...</div>
  }

  if (isError) {
    return <div>Error loading profile. Please try again.</div>
  }

  return (
    <div className="border-muted flex w-full flex-col gap-5 rounded-xl border p-4 dark:border-neutral-20 dark:bg-neutral-light">
      <UserCircle2Icon className="mx-auto flex size-32 justify-center rounded-full bg-slate-200 text-slate-400" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          type="text"
          label="Username *"
          placeholder="Enter username"
          {...register("username")}
          error={errors?.username}
        />
        <Input
          type="email"
          label="email *"
          placeholder="Enter Email Address"
          {...register("email")}
          error={errors?.email}
          disabled={true}
        />
        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              international
              defaultCountry="IN"
              error={errors.phoneNo?.message}
            />
          )}
        />
        <Button
          type="submit"
          className="ml-auto flex h-10 items-end justify-end text-lg"
          disabled={isPending}
          loader={isPending}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default AccountDetails
