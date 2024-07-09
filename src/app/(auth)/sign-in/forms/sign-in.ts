import { z } from "zod";

const signInForm = z.object({
  email: z.string().email("Пожалуйста, введите корректный email"),
  password: z.string(),
});

export type SignInData = z.infer<typeof signInForm>;
export default signInForm;
