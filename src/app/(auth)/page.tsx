"use server";

import LoginComp from "@/components/login/LoginComp";

// import { getUser } from "../../api/userApi";

// import { redirect } from "next/navigation";

export default async function HomePage() {
  // const user = await getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  return (
    <main className="flex w-full justify-center items-center h-screen">
      <LoginComp />
    </main>
  );
}
