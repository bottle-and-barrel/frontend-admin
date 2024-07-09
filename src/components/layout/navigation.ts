import {
  FolderTree,
  Home,
  Megaphone,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavigationLink extends React.HTMLAttributes<HTMLElement> {
  href: string;
  title: string;
  icon: LucideIcon;
}
export type NavigationSection = NavigationLink[];
export type Navigation = NavigationSection[];

export default [
  [{ href: "/", title: "Главная", icon: Home }],
  [
    { href: "/orders", title: "Заказы", icon: ShoppingCart },
    { href: "/products", title: "Товары", icon: Package },
    { href: "/categories", title: "Категории", icon: FolderTree },
  ],
  [
    { href: "/users", title: "Пользователи", icon: Users },
    { href: "/advertisment", title: "Реклама", icon: Megaphone },
  ],
] satisfies Navigation;
