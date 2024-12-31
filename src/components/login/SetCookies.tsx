"use server";

import { cookies } from "next/headers";

const SetCookies = async (res: any) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", `Bearer ${res?.data?.accessToken}`);
};

export default SetCookies;
