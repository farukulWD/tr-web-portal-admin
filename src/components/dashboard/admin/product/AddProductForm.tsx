"use client";

import { useEffect, useState } from "react";
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

import { useSearchParams } from "next/navigation";
import {
  useCreateProductMutation,
  useGetProductsByIdQuery,
  useUpdatedProductMutation,
} from "@/redux/api/productApi";

const productValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  description: z.string().optional(),
  stock: z.number().int().min(0, {
    message: "Stock must be a non-negative integer.",
  }),
  group: z.string().optional(),
  productCode: z.string().optional(),
  image: z.string().url().optional(),
});

type ProductFormValues = z.infer<typeof productValidationSchema>;

export function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      stock: 0,
      // group: "",
      // productCode: "",
      // image: "",
    },
  });

  const { reset } = form;
  const [createProduct] = useCreateProductMutation(); // Hook usage
  const [updatedProduct] = useUpdatedProductMutation();
  const { data } = useGetProductsByIdQuery(
    {
      _id: queryId?.toString() as string,
    },
    { skip: !queryId }
  );
  useEffect(() => {
    if (queryId) {
      const result = data?.data;
      if (result) {
        reset(result);
      }
    }
  }, [queryId, reset, data?.data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    try {
      // const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("price", data.price.toString());
      // formData.append("description", data.description || "");
      // formData.append("stock", data.stock.toString());
      // // Uncomment the following lines to include additional fields
      // // formData.append("group", data.group || "");
      // // formData.append("productCode", data.productCode || "");
      // if (file) {
      //   formData.append("image", file);
      // }
      const productData: ProductFormValues = {
        name: data.name,
        price: data?.price,
        description: data?.description,
        stock: data?.stock,
        group: data?.group,
      };
      if (!queryId) {
        await createProduct(productData);
      } else {
        await updatedProduct({ _id: queryId, body: { ...productData } });
      }

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
        <div className="w-full lg:flex gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex justify-between h-3">
                  <FormLabel>
                    Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormMessage className="text-[0.7rem]" />
                </div>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of the product.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem className="w-full">
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
        </div>

        <div className="w-full lg:flex gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex justify-between h-3">
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
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter the price of the product.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
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
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
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
            name="productCode"
            render={({ field }) => (
              <FormItem className="w-full">
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
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex justify-between h-3">
                  <FormLabel>Description</FormLabel>
                  <FormMessage className="text-[0.7rem]" />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Product description"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a description of the product (optional).
                </FormDescription>
              </FormItem>
            )}
          />
          <FormItem>
            <div className="flex justify-between h-3">
              <FormLabel>Image</FormLabel>
            </div>
            <FormControl>
              <div className="relative h-52 w-full border-dashed border-2 border-gray-300 rounded-lg">
                <input
                  type="file"
                  className="opacity-0 w-full h-full absolute inset-0"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center h-full text-center font-semibold text-gray-400 gap-2">
                  Drag and drop to add your image
                  <br />
                  or click to browse your files
                  <Button type="button">Browse File</Button>
                </div>
              </div>
            </FormControl>
          </FormItem>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
