"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  rest?: any;
};

export default function TrPasswordInput({
  name,
  label,
  placeholder,
  className,
  readonly,
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem className={cn(`${className}`)}>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    `hide-password-toggle pr-10 ${
                      error?.message
                        ? "focus:border-red focus:!shadow-[0px_0px_5px] focus:!shadow-red"
                        : "focus:border-primary focus:!shadow-[0px_0px_5px] focus:!shadow-primary"
                    }`
                  )}
                  {...field}
                  value={field?.value}
                  placeholder={placeholder}
                  id={label}
                  {...rest}
                  readOnly={readonly}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={!field?.value}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </FormControl>
            {error && (
              <FormMessage className="text-red-500">{error?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />
      {/* Style to hide browser password toggles */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
}
