"use server";

import { cookies } from "next/headers";

export async function createCookie(cookieName: string, data: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, data);
}

export async function getCookie(cookieName: string) {
  const cookieStore = await cookies();
  const data = cookieStore.get(cookieName);
  return data?.value ?? null;
}

export async function deleteCookie(cookieName: string) {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
