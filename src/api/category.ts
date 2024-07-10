import { Product, products } from "./product";

export interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

const categories = [
  {
    id: 1,
    name: "Вино",
    slug: "wine",
    products,
  },
  { id: 2, name: "Шампанское и игристое", slug: "champagne", products: [] },
  { id: 3, name: "Виски", slug: "whiskey", products: [] },
  { id: 4, name: "Коньяк", slug: "cognac", products: [] },
  { id: 5, name: "Крепкие напитки", slug: "ksn", products: [] },
  { id: 6, name: "Пиво", slug: "beer", products: [] },
  { id: 7, name: "Вода", slug: "water", products: [] },
  { id: 8, name: "Безалкогольные напитки", slug: "drinks", products: [] },
] satisfies Category[];

export async function all() {
  return categories;
}

export async function getBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
