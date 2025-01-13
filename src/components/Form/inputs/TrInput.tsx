import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";
type FormInputProps = {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  rest?: any;
};

export default function TrInput({
  name,
  type,
  label,
  placeholder,
  className,
  readonly,
  ...rest
}: FormInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
       
          return (
            <FormItem className={cn(`${className}`)}>
              <FormControl>
                <div>
                <label htmlFor={label}>{label}</label>
                  <Input
                    className={cn(`${ 
                      error?.message
                        ? "focus:border-red focus:!shadow-[0px_0px_5px] focus:!shadow-red"
                        : "focus:border-primary focus:!shadow-[0px_0px_5px] focus:!shadow-primary"
                    }`)}
                    type={type}
                    {...field}
                    value={field?.value}
                    placeholder={placeholder}
                    id={label}
                    
                    {...rest}
                    readOnly={readonly}
                  />
                </div>
              </FormControl>
              
              {error && (
               <strong className="text-red-400 text-xs">{error?.message}</strong>
              )}
            </FormItem>
          )
        }}
      />
    </div>
  );
}
