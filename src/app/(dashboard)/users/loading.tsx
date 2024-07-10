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
    title: "Пользователи",
    href: "/users",
  },
];

export const metadata: Metadata = {
  title: "Список пользователей",
};

export default function UserLoadingPage() {
  return (
    <main>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card>
        <div className="pb-4 flex flex-col justify-between md:items-center md:flex-row md:pb-0">
          <CardHeader>
            <CardTitle>Пользователи</CardTitle>
            <CardDescription>
              Список всех пользователей платформы
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    </main>
  );
}
