"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { forgotPasswordHandler } from "@/lib/api/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define your schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("Enter a valid email address."),
})
const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordHandler,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }
  return (
    <div className="flex flex-col space-y-11">
      <div className="space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-800">
            Forgot Password?
          </h2>
          <span className="font-semibold text-gray-400">
            Enter Your Email Adress Here..
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="text"
            label="Email *"
            placeholder="Enter your email"
            {...register("email")}
            error={errors?.email}
          />
          <Button
            type="submit"
            className="h-11 w-full text-base font-semibold uppercase"
            disabled={isPending}
            loader={isPending}
          >
            {isPending ? "Verifying.." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
