"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { toast } from "sonner";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";

const singUpValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters long.",
  }),
  city: z
    .string({
      message: "City is required.",
    })
    .min(1),
  thana: z
    .string({
      message: "Thana must be a non-negative integer.",
    })
    .min(1),
  postal: z.string().min(1, {
    message: "Postal code must be a positive number.",
  }),
  country: z
    .string({
      message: "Country is required.",
    })
    .min(1),
  mobile: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 characters long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type singUpFormValues = z.infer<typeof singUpValidationSchema>;

export function SingUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUser] = useCreateUserMutation();
  const router = useRouter();
  const form = useForm<singUpFormValues>({
    resolver: zodResolver(singUpValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      thana: "",
      postal: "0",
      country: "Bangladesh",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });
  const date = new Date();
  console.log(date);
  async function onSubmit(data: singUpFormValues) {
    setIsSubmitting(true);
    try {
      const singUpData = new FormData();
      singUpData.append("email", data?.email);
      singUpData.append("mobile", data?.mobile);
      singUpData.append("name", data?.name);
      singUpData.append("password", data.password);
      singUpData.append("address[address]", data?.address);
      singUpData.append("address[city]", data?.city);
      singUpData.append("address[country]", data?.country);
      singUpData.append("address[postal]", data?.postal.toString());
      singUpData.append("address[thana]", data?.thana);

      // Use FormData with your API request
      const res = await createUser(singUpData).unwrap(); // Assuming `createUser` handles FormData
      if (res?.success) {
        toast("User  has been created", {
          description: `${date}`,
        });
        router.push("/");
      }
    } catch (error) {
      // console.error("Error submitting form:", error?.message);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="thana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thana</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your thana name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter postal code"
                    {...field}
                    type="number"
                    defaultValue={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
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
                    type="password"
                    placeholder="Enter your password again"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormItem>
            <div className="flex justify-between h-3">
              <FormLabel>Image</FormLabel>
            </div>
            <FormControl>
              <div className="relative h-52 w-full border-dashed border-2 border-gray-300 rounded-lg">
                <input
                  type="file"
                  className="opacity-0 w-full h-full absolute inset-0"
                  // onChange={handleFileChange}
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

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
