"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";
import ImageUploader from "@/app/components/img-uploader";

// Define your schema for form validation
const formSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    image: z.string().min(1, { message: "This field has to be filled." }),
    icon: z.string().min(1, { message: "This field has to be filled." }),
});

export function AddCategoryForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: "",
            icon: "",
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="space-y-10">
            <Form {...form}>
                <div className="flex flex-col gap-2">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-4">
                                <Label>Category Image:</Label>
                                <ImageUploader />
                            </div>
                            <div className="flex items-start gap-4">
                                <Label>Category Logo:</Label>
                                <ImageUploader />
                            </div>
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Category Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Button
                                type="submit"
                                className="w-full h-11 text-base text-bronze uppercase font-semibold"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </Form>
        </div>
    );
}
