"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "(Price must be a positive number.)",
  }),
  description: z.string().optional(),
  quantity: z.number().int().min(0, {
    message: "(Quantity must be a non-negative integer.)",
  }),
  group: z.string().optional(),
  productCode: z.string().optional(),
  image: z.string().url().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      group: "",
      productCode: "",
      image: "",
    },
  });
  console.log({ form });
  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    try {
      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Product submitted successfully!");
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between h-3">
                <FormLabel>
                  Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the product.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between  h-3">
                <FormLabel>
                  Price <span className="text-destructive">*</span>
                </FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter the price of the product.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between h-3">
                <FormLabel>Description</FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormDescription>
                Enter a description of the product (optional).
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between h-3">
                <FormLabel>
                  Quantity <span className="text-destructive">*</span>
                </FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Enter the quantity of the product in stock.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between h-3">
                <FormLabel>Group</FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Input placeholder="Product group" {...field} />
              </FormControl>
              <FormDescription>
                Enter the group this product belongs to (optional).
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between h-3">
                <FormLabel>Product Code</FormLabel>
                <FormMessage className="text-[0.7rem]" />
              </div>
              <FormControl>
                <Input placeholder="Product code" {...field} />
              </FormControl>
              <FormDescription>
                Enter the product code (optional).
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            console.log({ field });
            return (
              <FormItem>
                <div className="flex justify-between h-3">
                  <FormLabel>Image URL</FormLabel>
                  <FormMessage className="text-[0.7rem]" />
                </div>
                <FormControl className="relative  h-32 w-full border-dashed border-2 border-gray-300 rounded-lg">
                  <div>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      type="file"
                      className="opacity-0 w-full h-full absolute inset-0"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-center font-semibold text-gray-400 gap-2">
                      Drag and drop to added your image
                      <br />
                      or click to browse your files
                      <Button>Browse File</Button>
                    </div>
                    {/* <div className="flex flex-col items-center justify-center h-full text-center font-semibold text-gray-400 gap-2">
                      <img
                        src={field.value}
                        alt="image"
                        width={100}
                        height={100}
                      />
                      <Button>Browse File</Button>
                    </div> */}
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
