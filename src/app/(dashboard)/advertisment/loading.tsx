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
    title: "Реклама",
    href: "/advertisment",
  },
];

export const metadata: Metadata = {
  title: "Рекламные баннеры",
};

export default function AdvertismentLoadingPage() {
  return (
    <main>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card>
        <div className="pb-4 flex flex-col justify-between md:items-center md:flex-row md:pb-0">
          <CardHeader>
            <CardTitle>Реклама</CardTitle>
            <CardDescription>Настройка маркетинга на платформе</CardDescription>
          </CardHeader>
        </div>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    </main>
  );
}
