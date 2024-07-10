export type ProductImage = string[];

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  price: number;
  edited_at: number;
  images?: ProductImage;
}

export const products = [
  {
    id: 1,
    name: "Вино Shiraz Mr Borio's, Simonsig, 2021",
    description:
      "Светло-соломенный цвет с зеленоватыми оттенками. Аромат с тонами цветов, миндаля и экзотических фруктов. Сбалансированное, освежающее вино с гармоничной кислотностью, гармоничным сочетанием фруктового вкуса и минеральной солёности в послевкусии.",
    price: 2490,
    sku: "147564",
    slug: "shiraz_mr_borio_s_2021",
    category: "Вино",
    edited_at: 1720611181,
  },
  {
    id: 2,
    name: "Вино Shiraz Mr Borio's, Simonsig, 2021",
    description:
      "Светло-соломенный цвет с зеленоватыми оттенками. Аромат с тонами цветов, миндаля и экзотических фруктов. Сбалансированное, освежающее вино с гармоничной кислотностью, гармоничным сочетанием фруктового вкуса и минеральной солёности в послевкусии.",
    price: 2490,
    sku: "147564",
    slug: "shiraz_mr_borio_s_2021_1",
    category: "Вино",
    edited_at: 1720611181,
  },
  {
    id: 3,
    name: "Вино Shiraz Mr Borio's, Simonsig, 2021",
    description:
      "Светло-соломенный цвет с зеленоватыми оттенками. Аромат с тонами цветов, миндаля и экзотических фруктов. Сбалансированное, освежающее вино с гармоничной кислотностью, гармоничным сочетанием фруктового вкуса и минеральной солёности в послевкусии.",
    price: 2490,
    sku: "147564",
    slug: "shiraz_mr_borio_s_2021_2",
    category: "Вино",
    edited_at: 1720611181,
  },
  {
    id: 4,
    name: "Вино Shiraz Mr Borio's, Simonsig, 2021",
    description:
      "Светло-соломенный цвет с зеленоватыми оттенками. Аромат с тонами цветов, миндаля и экзотических фруктов. Сбалансированное, освежающее вино с гармоничной кислотностью, гармоничным сочетанием фруктового вкуса и минеральной солёности в послевкусии.",
    price: 2490,
    sku: "147564",
    slug: "shiraz_mr_borio_s_2021_3",
    category: "Вино",
    edited_at: 1720610181,
  },
  {
    id: 5,
    name: "Вино Shiraz Mr Borio's, Simonsig, 2021",
    description:
      "Светло-соломенный цвет с зеленоватыми оттенками. Аромат с тонами цветов, миндаля и экзотических фруктов. Сбалансированное, освежающее вино с гармоничной кислотностью, гармоничным сочетанием фруктового вкуса и минеральной солёности в послевкусии.",
    price: 2490,
    sku: "147564",
    slug: "shiraz_mr_borio_s_2021_4",
    category: "Вино",
    edited_at: 1720601181,
  },
] satisfies Product[];

export async function all() {
  return products;
}

export async function getById(id: number) {
  return products.find((p) => p.id === id);
}

export async function getBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
