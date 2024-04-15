"use client";

import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import Header from "./components/Header";
import Input from "./components/Input";
import Icon from "./components/Icon";
import { useState } from "react";
import { login } from "@/services/authService";

const loginSchema = z.object({
  email: z.string().email("Insira um e-mail válido.").toLowerCase(),
  password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
});

export default function Home() {

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const data = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const response = await login(data.email, data.password)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-xs"
        action=""
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Header title="Bem vindo(a)!" />
          <Icon name="user" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Email</label>
          <Input
            type="email"
            name="email"
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <Input
            type="password"
            name="password"
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
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
