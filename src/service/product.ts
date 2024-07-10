import * as productApi from "@/api/product";

export const KEY = "product";

export interface Product extends productApi.Product {
  link: string;
}

export function mapProduct(product: productApi.Product) {
  return { ...product, link: `/products/${product.id}` } as Product;
}

export async function all() {
  const products = await productApi.all();
  return products.map(mapProduct);
}

export async function getById(id: number) {
  const product = await productApi.getById(id);
  if (!product) return null;
  return mapProduct(product);
}

export async function getBySlug(slug: string) {
  const product = await productApi.getBySlug(slug);
  if (!product) return null;
  return mapProduct(product);
}
