"use client";

import React, { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import request from "@/utils/ApiRequest2";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/enums/productsEnum";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Product name is required.",
      })
      .max(32, { message: "Maximum 32 characters is allowed." }),
    description: z.string().min(2, {
      message: "Description is required.",
    }),
    price: z.coerce.number().gt(0),
    category: z.string().min(2, {
      message: "Category is required.",
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);

    const apiResponse = await request("/products", "POST", data);

    if (apiResponse.success) {
      toast.success(apiResponse.message);
      router.push("/products");
    } else {
      toast.error(apiResponse.message);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto my-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example: Adidas Shoes"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription className="text-xs">
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ProductCategory.FOOTWEAR}>
                            Footwear
                          </SelectItem>
                          <SelectItem value={ProductCategory.WATCHES}>
                            Watches
                          </SelectItem>
                          <SelectItem value={ProductCategory.WINTER_WEAR}>
                            Winter wear
                          </SelectItem>
                          <SelectItem value={ProductCategory.BAGS}>
                            Bags
                          </SelectItem>
                          <SelectItem value={ProductCategory.SUITCASE}>
                            Suitcase
                          </SelectItem>
                          <SelectItem value={ProductCategory.LAPTOP}>
                            Laptop
                          </SelectItem>
                          <SelectItem value={ProductCategory.MOBILE}>
                            Mobile
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="price"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price in ₹(INR)"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4 justify-end">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProductForm;
