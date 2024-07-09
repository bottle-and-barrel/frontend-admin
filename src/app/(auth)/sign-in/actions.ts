"use server";

import { AuthCredentials } from "@/api/auth";
import { authStorage } from "@/lib/storage";
import { signIn as doSignIn } from "@/service/auth";
import { cookies } from "next/headers";

export interface ActionData extends AuthCredentials {}
export type ActionResult = [boolean, string | null];

export async function signIn(formData: FormData): Promise<ActionResult> {
  const credentials = Object.fromEntries(formData) as unknown as ActionData;

  try {
    const authResult = await doSignIn(credentials);
    authStorage(cookies()).set(authResult);
  } catch (e) {
    return [false, "Неправильный логин и/или пароль"];
  }
  return [true, null];
}
