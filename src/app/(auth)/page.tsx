import LoginComp from "@/components/login/LoginComp";

export default async function HomePage() {
  return (
    <main className="flex w-full justify-center items-center h-screen">
      <LoginComp />
    </main>
  );
}
