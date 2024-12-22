"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const GBreadcrumb = () => {
  const path = usePathname();

  const spitePath = path.split("/").slice(1, path.length);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">
            834384 - M/S Masnun Plastic Gallery. [TEL Furniture]
          </BreadcrumbLink>
        </BreadcrumbItem>

        {spitePath.map((item) => (
          <div key={item} className="flex items-center">
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem
              key={item}
              className="cursor-pointer hover:text-primary"
            >
              {item}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default GBreadcrumb;
