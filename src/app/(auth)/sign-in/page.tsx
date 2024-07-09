import { Metadata } from "next";
import SignInForm from "./components/sign-in-form";

export const metadata: Metadata = {
  title: "Вход",
};

export default function SignInPage() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <SignInForm />
    </section>
  );
}
