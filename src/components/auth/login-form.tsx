"use client"

import DashboardPageRoute from "@/app/(root)/dashboard/route.info"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdminHandler } from "@/lib/api/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("Enter a valid email address."),
  password: z.string().min(1, { message: "This field has to be filled." }),
})

export function LoginForm() {
  const router = useRouter()
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
    mutationFn: loginAdminHandler,
    onSuccess: () => {
      router.replace(DashboardPageRoute.navigate())
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-slate-950 uppercase dark:text-white/70">
        Log In
      </h2>
      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="text"
            label="Email *"
            placeholder="Enter your email"
            {...register("email")}
            error={errors?.email}
          />
          <div>
            <Input
              type="password"
              label="Password *"
              placeholder="Enter your Password"
              {...register("password")}
              error={errors?.password}
            />
            <Link href="/forgot-password" className="text-sub text-sm">
              forgot password?
            </Link>
          </div>
          <div className="space-y-1.5">
            <Button
              type="submit"
              className="h-11 w-full text-base font-semibold uppercase"
              disabled={isPending}
              loader={isPending}
            >
              Log In
            </Button>
            <span className="text-sm">
              Do not have an Account?
              <Link href="/sign-up" className="text-sub ml-1">
                sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
