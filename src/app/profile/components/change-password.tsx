"use client";
import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword } from "@/lib/api/profile";

const formSchema = z.object({
    password: z.string().min(2, {
        message: "Enter Current Password",
    }),
    newPassword: z.string().min(2, {
        message: "Enter Current Password",
    }),
});

const ChangePassword = () => {
    const { mutate } = useMutation({
        mutationFn: changePassword,
        onSuccess: (payload) => {
            toast.success(payload?.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newPassword: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }
    return (
        <div className="flex flex-col space-y-6 border border-muted rounded-xl p-4">
            <h2 className="text-slate-900 text-xl font-semibold">Change Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your current password"
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
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter new password"
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
                        className="justify-end flex items-end ml-auto text-lg h-10"
                    >
                        Change
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ChangePassword;
