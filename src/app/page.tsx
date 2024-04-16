"use client";

import Header from "./components/Header";
import Input from "./components/Input";
import Icon from "./components/Icon";
import { login } from "@/services/auth/authService";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./utils/schemas";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  async function handleLogin(data: LoginFormData) {
    try {
      const { result } = await login(data.email, data.password);

      if (result.accessToken) {
        setCookie(null, "USER_TOKEN", result.accessToken, {
          maxAge: 60 * 60 * 1, // 1 day
          path: "/",
        });
        setCookie(null, "USER_ID", String(result.user.id), {
          maxAge: 60 * 60 * 1, // 1 day
          path: "/",
        });
        router.push("/dashboard");
        toast.success("Bem vindo(a)");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Header title="Bem vindo(a)!" />
          <Icon name="user" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            type="email"
            className={`border text-white shadow-sm rounded h-10 px-3 bg-zinc-900 ${
              errors.email ? "border-red-500" : "border-zinc-800"
            }`}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <Input
            {...register("password")}
            type="password"
            className={`border text-white shadow-sm rounded h-10 px-3 bg-zinc-900 ${
              errors.email ? "border-red-500" : "border-zinc-800"
            }`}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
