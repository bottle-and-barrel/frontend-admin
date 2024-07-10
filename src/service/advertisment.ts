import * as advApi from "@/api/advertisment";

export const KEY = "adv";

export interface Advertisment extends advApi.Advertisment {
  link: string;
}

export function mapAdv(adv: advApi.Advertisment) {
  return { ...adv, link: `/advertisment/${adv.id}` } as Advertisment;
}

export async function all() {
  const users = await advApi.all();
  return users.map(mapAdv);
}

export async function getById(id: number) {
  const adv = await advApi.getById(id);
  if (!adv) return null;
  return mapAdv(adv);
}
