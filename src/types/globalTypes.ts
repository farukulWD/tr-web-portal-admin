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
export interface ColumnConfig<T> {
  key: string;
  label: string;
  align: "left" | "center" | "right" | undefined;
  width?: string;
  render?: (
    value: any,
    item?: T | undefined,
    items?: T[] | []
  ) => React.ReactNode;
}
export interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right" | undefined;
  width?: string | undefined;
  render?: (value: any, row: any | undefined, array: any[]) => React.ReactNode;
}

export interface Footer {
  key: string;
  label: string;
  render?: (data: any[]) => React.ReactNode;
}
