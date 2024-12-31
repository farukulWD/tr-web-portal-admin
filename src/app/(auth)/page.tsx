import LoginComp from "@/components/login/LoginComp";
import { cookies } from "next/headers";

// import { getUser } from "../../api/userApi";

// import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const theme = cookieStore.getAll();
  console.log(theme);
  return (
    <main className="flex w-full justify-center items-center h-screen">
      <LoginComp />
    </main>
  );
}
