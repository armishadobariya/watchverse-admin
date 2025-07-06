"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPasswordHandler } from "@/lib/api/auth"
import { ResetPasswordPayload } from "@/type/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
const ResetPasswordForm = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = (params.id as string) || searchParams.get("id")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      resetPasswordHandler(id, payload),
    onSuccess: (payload) => {
      toast.success(payload?.message)
      router.push("/login")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }
  return (
    <div className="flex flex-col space-y-11">
      <div className="space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-800">
            Reset your Password
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="password"
            label="New Password *"
            placeholder="Enter New Password"
            {...register("newPassword")}
            error={errors?.newPassword}
          />
          <Input
            type="password"
            label="Confirm Password *"
            placeholder="Re-Enter your password"
            {...register("confirmPassword")}
            error={errors?.confirmPassword}
          />
          <Button
            type="submit"
            className="h-11 w-full text-base font-semibold uppercase"
            disabled={isPending}
            loader={isPending}
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordForm
