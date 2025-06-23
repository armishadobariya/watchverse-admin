"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/lib/api/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (payload) => {
      toast.success(payload.message)
      router.push("/")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-slate-950 uppercase">Log In</h2>
      <Form {...form}>
        <div className="flex flex-col gap-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href="/forgot-password" className="text-bronze text-sm">
                forgot password?
              </Link>
            </div>
            <div className="space-y-1.5">
              <Button
                type="submit"
                className="h-11 w-full text-base font-semibold uppercase"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Log In"}
              </Button>
              <span className="text-sm">
                Do not have an Account?
                <Link href="/sign-up" className="text-bronze">
                  sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}
