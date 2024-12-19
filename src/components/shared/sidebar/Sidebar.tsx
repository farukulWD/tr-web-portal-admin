"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { sidebarItem } from "@/data/sidebarItems";
import DownArrow from "../svg/DownArrow";

const Sidebar = ({ asideClassName }: { asideClassName?: string }) => {
  const pathName = usePathname();
  const [openChildren, setOpenChildren] = useState<string | null>(null);
  console.log("pathName:", pathName);
  console.log("openChildren:", openChildren);
  useEffect(() => {
    const savedKey = localStorage.getItem("key");
    console.log("savedKey:", savedKey);
    if (savedKey) {
      setOpenChildren(savedKey);
    }
  }, []);

  const toggleChildren = (key: string) => {
    const newKey = openChildren === key ? null : key;
    setOpenChildren(newKey);
    localStorage.setItem("key", newKey || "");
  };

  return (
    <aside
      className={cn(
        "aside xl-w-[15%] no-scrollbar sticky bottom-0 top-[105px] col-span-4 row-span-full hidden max-h-[calc(100vh-1.5rem*2)] min-h-[calc(100vh-1.5rem*2)] overflow-y-auto rounded-xl px-1 py-5 font-semibold shadow-lg xl:block bg-red-200",
        asideClassName
      )}
    >
      <div className="flex flex-col gap-2">
        {sidebarItem.map((item) => {
          return (
            <div key={item.type} className="min-w-full">
              {item.children ? (
                <div
                  className={`${
                    openChildren === item.key
                      ? "rounded-md bg-green-300 bg-opacity-30 transition-all duration-500"
                      : "transition-all duration-500"
                  }`}
                >
                  <button
                    className="flex w-full items-center rounded-md p-2 transition-all duration-300"
                    onClick={() => toggleChildren(item.key)}
                  >
                    {item.icon}

                    <span className="ml-2 grow-[1] text-start text-base xl:text-xs">
                      {item.type}
                    </span>
                    <DownArrow itemKey={item.key} openChildren={openChildren} />
                  </button>
                  <div
                    className={`children-container ${
                      openChildren === item.key ? "open" : ""
                    }`}
                  >
                    {openChildren === item.key &&
                      item.children.map((child) => {
                        const isActive = pathName === child.path;

                        return (
                          <Link
                            key={child.type}
                            href={child?.path || "#"}
                            className={`flex w-full items-center justify-start rounded-md p-2 transition-all duration-300 ${
                              isActive
                                ? "bg-opacity-100 bg-red-700"
                                : "hover:bg-red-700 hover:bg-opacity-100"
                            }`}
                          >
                            {child.icon}
                            <span className="ml-2 text-base xl:text-xs">
                              {child.type}
                            </span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.path || "#"}
                  className={`flex w-full items-center rounded-md p-2 transition-all duration-300 ${
                    pathName === item.path
                      ? "bg-opacity-100 bg-red-700"
                      : "hover:bg-opacity-100 hover:bg-red-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2 text-base xl:text-xs">{item.type}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
