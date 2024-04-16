"use client";

import { createUser } from "@/services/user/userService";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Input from "@/app/components/Input";
import { z } from "zod";
import { createUserSchema } from "../utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateUserFormData = z.infer<typeof createUserSchema>;

export default function CreateUser() {
  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies.USER_TOKEN;
  const isAuthenticated = !!token;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  async function handleCreateUser(data: CreateUserFormData) {
    try {
      const { status } = await createUser(data);
      if (status === 201) {
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center py-4">
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
        action=""
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Header title="Cadastrar usuário" />
          <Icon name="plus" />
        </div>
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nome</label>
              <Input
                {...register("name")}
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className={`border text-white shadow-sm rounded h-10 px-3 bg-zinc-900 ${
                  errors.name ? "border-red-500" : "border-zinc-800"
                }`}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Input
                {...register("email")}
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className={`border text-white shadow-sm rounded h-10 px-3 bg-zinc-900 ${
                  errors.password ? "border-red-500" : "border-zinc-800"
                }`}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="type">Tipo</label>
              <select
                {...register("type")}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`border text-white shadow-sm rounded h-10 px-3 bg-zinc-900 ${
                  errors.type ? "border-red-500" : "border-zinc-800"
                }`}
              >
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 px-4"
              >
                Cadastrar
              </button>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
