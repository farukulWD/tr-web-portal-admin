import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";

type FormFileUploaderProps = {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  readonly?: boolean;
  rest?: any;
};

export default function TrFileUploader({
  name,
  label,
  accept,
  multiple,
  className,
  readonly,
  ...rest
}: FormFileUploaderProps) {
  
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
        
          return (
            <FormItem className={cn(`${className}`)}>
              <FormControl>
                <div className="relative p-3 h-52 w-full border-dashed border-2 border-gray-300 rounded-lg">
                  <input
                    id={label}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="opacity-0 w-full h-full absolute inset-0"
                    onChange={(e) => {
                      if (!readonly) {
                     
                        field.onChange(e.target.files); 
                      }
                    }}
                    onBlur={field.onBlur}
                    disabled={readonly}
                    {...rest}
                  />

                  <div className="flex flex-col items-center justify-center h-full text-center font-semibold text-gray-400 gap-2">
                    Drag and drop to add your image
                    <br />
                    or click to browse your files
                    <Button type="button">Browse File</Button>
                  </div>
                </div>
              </FormControl>
            
              {error && (
                <strong className="text-red-400 text-xs mt-1">
                  {error?.message}
                </strong>
              )}
            </FormItem>
          );
        }}
      />
    </div>
  );
}
