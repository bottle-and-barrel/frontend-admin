"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { error, ok, unknownError } from "@/lib/toast";
import { toFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "../actions";
import signInForm, { SignInData } from "../forms/sign-in";

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SignInData>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInData) => {
    const formData = toFormData(data);

    try {
      const result = await signIn(formData);
      if (!result[0]) {
        toast(error(result[1]!));
        return;
      }
      toast(ok("Успешный вход!"));
      router.push("/");
    } catch (e) {
      toast(unknownError);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Вход</CardTitle>
            <CardDescription>
              Введите e-mail и пароль для доступа к панели
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={fieldState.error && "border-error"}
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={fieldState.error && "border-error"}
                        id="password"
                        type="password"
                        placeholder="●●●●●●●●"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={
                !form.formState.isDirty ||
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
            >
              {form.formState.isSubmitting ? "Загрузка..." : "Войти"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
