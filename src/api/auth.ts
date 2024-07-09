import client, { skipAuthHeader, skipTokenHeader } from "@/lib/axios";
import { User } from "./user";

const ENDPOINT = "/auth";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthRefreshCredentials {
  refresh_token: AuthToken | string;
}

export interface AuthToken {
  token: string;
  expires: number;
}

export interface AuthResult {
  user_id: number;
  access_token: AuthToken;
  refresh_token: AuthToken;
}

export async function auth(credentials: AuthCredentials) {
  const headers = { [skipAuthHeader]: true };
  const { data } = await client.post<AuthResult>(ENDPOINT, credentials, {
    headers,
  });
  return data;
}

export async function refresh(credentials: AuthRefreshCredentials) {
  const possibleToken = credentials.refresh_token;
  const token =
    typeof possibleToken === "string" ? possibleToken : possibleToken.token;

  const headers = {
    Authorization: `Bearer ${token}`,
    [skipAuthHeader]: true,
    [skipTokenHeader]: true,
  };
  const { data } = await client.post<AuthResult>(
    `${ENDPOINT}/refresh`,
    {},
    { headers }
  );
  return data;
}

export async function me() {
  const { data } = await client.get<User>(`${ENDPOINT}/me`);
  return data;
}
