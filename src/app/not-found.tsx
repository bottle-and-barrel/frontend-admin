import { LinkButton } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <h1 className="text-8xl text-primary">
        4<SearchX className="inline-block size-24" />4
      </h1>
      <p className="text-primary text-2xl">Страница не найдена</p>
      <p className="text-muted-foreground/50 text-xl font-light italic">
        Этого не должно было произойти...
      </p>
      <LinkButton href="/" className="mt-4">
        Верните меня обратно
      </LinkButton>
    </main>
  );
}
