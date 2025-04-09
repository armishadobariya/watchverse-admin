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

import {
    useParams,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { ResetPasswordPayload } from "@/type/auth";
import { resetPassword } from "@/lib/api/auth";

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
    });
const ResetPasswordForm = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = (params.id as string) || searchParams.get("id");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ResetPasswordPayload) => resetPassword(id, payload),
        onSuccess: (payload) => {
            toast.success(payload?.message);
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
        <div className="flex flex-col space-y-11">
            <div className="space-y-7">
                <div className="flex items-center gap-2">
                    <Image src={"/icons/logo.svg"} width={60} height={60} alt="logo" />
                    <h1 className="text-bronze text-3xl font-bold">WatchVerse</h1>
                </div>
                <div className="space-y-1.5">
                    <h2 className="text-slate-800 text-2xl font-bold">
                        Reset your Password
                    </h2>
                </div>
            </div>

            <Form {...form}>
                <div className="flex flex-col gap-2">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter New Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Re-Enter your password"
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
                            Reset
                        </Button>
                    </form>
                </div>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;
