"use client"

import LoginPageRoute from "@/app/(auth)/login/route.info"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerAdminHandler } from "@/lib/api/auth"
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
  username: z.string().min(1, { message: "This field has to be filled." }),
  password: z.string().min(1, { message: "This field has to be filled." }),
})

type RegisterFormData = z.infer<typeof formSchema>

export function SignUpForm() {
  const router = useRouter()

  // form hooks
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  // Register mutation
  const { mutate, isPending } = useMutation({
    mutationFn: registerAdminHandler,
    onSuccess: () => {
      router.replace(LoginPageRoute.navigate())
    },
  })

  // form submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-slate-950 uppercase">Sign up</h2>

      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="text"
            label="Email *"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email}
          />
          <Input
            type="text"
            label="Username *"
            placeholder="Enter your Username"
            {...register("username")}
            error={errors.username}
          />
          <Input
            type="password"
            label="password *"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password}
          />
          <Button
            type="submit"
            className="h-11 w-full text-base font-semibold uppercase"
            disabled={isPending}
            loader={isPending}
          >
            Register
          </Button>
        </form>
        <div className="text-sm">
          <span className="text-slate-950">Already have an account?</span>{" "}
          <span className="text-sub">
            <Link href="/login">Log In</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
