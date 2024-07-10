export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users = [
  {
    id: 1,
    name: "StarPanda",
    email: "admin@example.com",
    role: "Администратор",
  },
  {
    id: 2,
    name: "stpnd",
    email: "user@example.com",
    role: "Пользователь",
  },
] satisfies User[];

export async function all() {
  return users;
}

export async function getById(id: number) {
  return users.find((u) => u.id === id);
}
