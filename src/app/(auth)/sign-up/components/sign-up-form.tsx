"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerAdmin } from "@/lib/api/auth";
import { toast } from "sonner";


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("Enter a valid email address."),
    username: z.string().min(1, { message: "This field has to be filled." }),
    password: z.string().min(1, { message: "This field has to be filled." }),
});

type RegisterFormData = z.infer<typeof formSchema>;

export function SignUpForm() {
    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerAdmin,
        onSuccess: (payload) => {
            console.log(payload);
            // toast.success(payload?.message);
            toast.success("Registration successful");
            router.push("/login");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <div className="space-y-10">
            <h2 className="text-3xl font-bold uppercase text-slate-950">Sign up</h2>

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
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button
                            type="submit"
                            className="w-full h-11 text-base uppercase font-semibold"
                            disabled={isPending}
                        >
                            {isPending ? "Registering..." : "Register"}
                        </Button>
                    </form>
                    <div className="text-sm">
                        <span className="text-slate-950">Already have an account?</span>{" "}
                        <span className="text-bronze">
                            <Link href="/login">Log In</Link>
                        </span>
                    </div>
                </div>
            </Form>
        </div>
    );
}