import { z } from "zod";

export type TFormField = {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: string;
  validation: z.ZodString;
};

import { ReactNode } from "react";

export interface ISidebarItem {
  type: string;
  key: string;
  path?: string;
  children?: ISidebarItem[];
  icon: ReactNode;
}
