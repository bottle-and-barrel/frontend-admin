import {
  SideNavigation,
  SideNavigationLink,
  SideNavigationSection,
} from "@/components/ui/nav-side";
import { Settings } from "lucide-react";
import Image from "next/image";
import navigation from "./navigation";

export default function PageSideNavigation(
  props: React.ComponentProps<typeof SideNavigation>
) {
  return (
    <SideNavigation {...props}>
      <SideNavigationSection>
        <Image
          src="/images/brand/logo.png"
          alt="Bottle & Barrel"
          title="Bottle & Barrel"
          width={20}
          height={20}
          priority={true}
        />
      </SideNavigationSection>
      {navigation.map((section, i) => (
        <SideNavigationSection key={i}>
          {section.map(({ icon: Icon, ...item }, j) => (
            <SideNavigationLink key={j} {...item}>
              <Icon className="h-5 w-5" />
            </SideNavigationLink>
          ))}
        </SideNavigationSection>
      ))}
      <SideNavigationSection className="mt-auto">
        <SideNavigationLink href="/settings" title="Настройки">
          <Settings className="h-5 w-5" />
        </SideNavigationLink>
      </SideNavigationSection>
    </SideNavigation>
  );
}
