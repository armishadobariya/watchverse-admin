"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { optional, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserCircle2Icon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { editProfile, getProfile } from "@/lib/api/profile";
import { PhoneInput } from "@/components/ui/phone-input";

// Define your schema
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNo: optional(z.string()),
});

const AccountDetails = () => {
    // Get profile data
    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Edit profile mutation
    const { mutate, isPending } = useMutation({
        mutationFn: editProfile,
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
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    if (isLoading) {
        return <div>Loading profile data...</div>;
    }

    if (isError) {
        return <div>Error loading profile. Please try again.</div>;
    }

    return (
        <div className="flex flex-col w-full gap-5 border border-muted rounded-xl p-4">
            <UserCircle2Icon className="bg-slate-200 rounded-full text-slate-400 size-32 justify-center flex mx-auto" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter email"
                                        {...field}
                                        readOnly
                                        disabled
                                        className="opacity-70 cursor-not-allowed"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        placeholder="Enter Phone number"
                                        {...field}
                                        defaultCountry="IN"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="justify-end flex items-end ml-auto text-lg h-10"
                        disabled={isPending}
                    >
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AccountDetails;
