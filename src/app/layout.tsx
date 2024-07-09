import ReactQueryProvider from "@/components/providers/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";

const font = Geologica({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Панель управления Bottle & Barrel",
    default: "Панель управления Bottle & Barrel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <TooltipProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
