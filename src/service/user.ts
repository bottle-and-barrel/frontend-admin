import * as userApi from "@/api/user";

export const KEY = "user";

export interface User extends userApi.User {
  link: string;
}

export function mapUser(user: userApi.User) {
  return { ...user, link: `/users/${user.id}` } as User;
}

export async function all() {
  const users = await userApi.all();
  return users.map(mapUser);
}

export async function getById(id: number) {
  const user = await userApi.getById(id);
  if (!user) return null;
  return mapUser(user);
}
