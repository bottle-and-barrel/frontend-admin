import PageBreadcrumbs, {
  Breadcrumbs,
} from "@/components/layout/page-breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Metadata } from "next";

const breadcrumbs: Breadcrumbs = [
  {
    title: "Товары",
    href: "/products",
  },
];

export const metadata: Metadata = {
  title: "Список товаров",
};

export default function Home() {
  return (
    <main>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader>
          <CardTitle>Товары</CardTitle>
          <CardDescription>Управление списком товаров</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    </main>
  );
}
