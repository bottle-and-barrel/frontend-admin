import PageFooter from "@/components/layout/page-footer";
import PageHeader from "@/components/layout/page-header";
import PageSideNavigation from "@/components/layout/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full flex-col sm:grid sm:grid-cols-[56px_1fr] sm:grid-rows-[auto_1fr_auto]">
      <div className="relative col-start-1 row-span-3 hidden sm:block">
        <PageSideNavigation className="h-full fixed left-0 top-0" />
      </div>
      <PageHeader className="col-start-2" />
      <div className="col-start-2 row-start-2 p-4">{children}</div>
      <PageFooter className="col-start-2 row-start-3 mt-auto h-auto" />
    </main>
  );
}
