export interface Advertisment {
  id: number;
  image: string;
  advLink: string;
  external: boolean;
  created_at: number;
  expires_at: number;
}

const adv = [
  {
    id: 1,
    image: "/images/example/advertisment.png",
    external: false,
    advLink: "#",
    created_at: 1720601181,
    expires_at: 1721801181,
  },
  {
    id: 2,
    image: "/images/placeholders/advertisment.png",
    external: false,
    advLink: "#",
    created_at: 1720591181,
    expires_at: 1722801181,
  },
] satisfies Advertisment[];

export async function all() {
  return adv;
}

export async function getById(id: number) {
  return adv.find((a) => a.id === id);
}
