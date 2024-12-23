/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react"; // Import useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { TFormField } from "@/types/globalTypes";
import { Eye, EyeClosed } from "lucide-react";

const GlobalForm = ({
  formFields,
  submitLogic,
}: {
  formFields: TFormField[];
  submitLogic: (values: any) => Promise<void>;
}) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );

  const formSchema = z.object(
    formFields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {} as Record<string, z.ZodType<any>>)
  );

  const passwordField = formFields.find((field) => field.name === "password");
  const confirmPasswordField = formFields.find(
    (field) => field.name === "confirm-password"
  );

  if (passwordField && confirmPasswordField) {
    formSchema.refine(
      (data) => data[confirmPasswordField.name] === data[passwordField.name],
      {
        message: "Passwords must match",
        path: [confirmPasswordField.name],
      }
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitLogic(values);
  }

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: inputField }) => (
              <FormItem
                className={`${field?.description ? "" : "mb-[0.5rem]"}`}
              >
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={
                        showPassword[field.name] ? "text" : field.type || "text"
                      }
                      placeholder={field.placeholder}
                      {...inputField}
                    />
                    {field.type === "password" && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.name)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                      >
                        {showPassword[field.name] ? (
                          <Eye className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeClosed className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    )}
                  </div>
                </FormControl>
                {field?.description && (
                  <FormDescription>{field?.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GlobalForm;
