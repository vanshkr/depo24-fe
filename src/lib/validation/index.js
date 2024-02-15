import { z } from "zod";
export const signUpFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be atleast 2 characters. " }),
    username: z
      .string()
      .min(3, { message: "Username must be atleast 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});
