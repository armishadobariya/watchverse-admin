"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { forgotPassword } from "@/lib/api/auth";

// Define your schema for form validation
const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("Enter a valid email address."),
});
const ForgotPasswordForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (payload) => toast.success(payload?.message),
        onError: (error) => toast.error(error.message),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }
    return (
        <div className="flex flex-col space-y-11">
            <div className="space-y-7">
                <div className="flex items-center gap-2">
                    <Image src={"/icons/logo.svg"} width={60} height={60} alt="logo" />
                    <h1 className="text-bronze text-3xl font-bold">WatchVerse</h1>
                </div>
                <div className="space-y-1.5">
                    <h2 className="text-slate-800 text-2xl font-bold">
                        Forgot Password?
                    </h2>
                    <span className="text-gray-400  font-semibold">
                        Enter Your Email Adress Here..
                    </span>
                </div>
            </div>

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
                        <Button
                            type="submit"
                            className="w-full h-11 text-base uppercase font-semibold"
                            disabled={isPending}
                        >
                            {isPending ? "Verifying.." : "Verify"}
                        </Button>
                    </form>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;
