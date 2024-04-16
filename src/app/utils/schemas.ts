import { z } from "zod";

const UserType = z
  .union([z.literal("admin"), z.literal("user")])
  .refine((value) => value === "admin" || value === "user", {
    message: "O campo deve ser 'admin' ou 'user'",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido")
    .toLowerCase(),
  password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
});

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .transform((name) => {
      return name.trim().replace(/\b\w/g, (char) => char.toUpperCase());
    }),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido")
    .toLowerCase(),
  password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
  type: UserType,
});

export const updateUserSchema = createUserSchema
