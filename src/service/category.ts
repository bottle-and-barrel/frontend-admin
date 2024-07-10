import * as categoryApi from "@/api/category";
import { Product, mapProduct } from "./product";

export const KEY = "category";

export interface Category extends categoryApi.Category {
  link: string;
  products: Product[];
}

export function mapCategory(category: categoryApi.Category) {
  return {
    ...category,
    link: `/categories/${category.id}`,
    products: category.products.map(mapProduct),
  } as Category;
}

export async function all() {
  const categories = await categoryApi.all();
  return categories.map(mapCategory);
}

export async function getBySlug(slug: string) {
  const category = await categoryApi.getBySlug(slug);
  if (!category) return null;
  return mapCategory(category);
}
