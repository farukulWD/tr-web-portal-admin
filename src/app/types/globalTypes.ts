import { z } from "zod";

export type TFormField = {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: string;
  validation: z.ZodString;
};
