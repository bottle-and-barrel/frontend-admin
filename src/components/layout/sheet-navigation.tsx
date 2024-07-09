import { DialogProps } from "@radix-ui/react-dialog";
import { PanelLeft, Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "../ui/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import navigation, { type NavigationLink } from "./navigation";

export interface SheetNavigationProps extends DialogProps {
  triggerClass?: string;
}

function SheetNavigationItem({ icon: Icon, ...item }: NavigationLink) {
  return (
    <Link
      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 py-3"
      activeClassName="text-secondary-foreground bg-secondary"
      {...item}
    >
      <Icon className="h-5 w-5" />
      {item.title}
    </Link>
  );
}

export default function SheetNavigation({
  triggerClass,
  ...props
}: SheetNavigationProps) {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className={triggerClass}>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex h-full flex-col">
          <SheetTitle className="pb-4">Меню</SheetTitle>
          <div className="divide-y">
            {navigation.map((section, i) => (
              <div key={i}>
                {section.map((item, j) => (
                  <SheetNavigationItem key={j} {...item} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <SheetNavigationItem
              href="/settings"
              icon={Settings}
              title="Настройки"
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
