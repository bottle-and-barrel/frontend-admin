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
import getQueryClient from "@/components/utility/query-client";
import { all, KEY } from "@/service/advertisment";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { PageSearchContainer } from "../globals";
import AdvertismentTable from "./components/adv-table";

const breadcrumbs: Breadcrumbs = [
  {
    title: "Реклама",
    href: "/advertisment",
  },
];

export const metadata: Metadata = {
  title: "Рекламные баннеры",
};

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: [KEY], queryFn: all });

  return (
    <main>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <Card>
        <div className="pb-4 flex flex-col justify-between md:items-center md:flex-row md:pb-0">
          <CardHeader>
            <CardTitle>Реклама</CardTitle>
            <CardDescription>Настройка маркетинга на платформе</CardDescription>
          </CardHeader>
          <PageSearchContainer className="px-6 flex-grow md:flex-grow-0 md:w-80" />
        </div>
        <CardContent>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AdvertismentTable />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </main>
  );
}