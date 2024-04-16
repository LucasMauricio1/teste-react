"use client";

import {
  deleteUser,
  getUserById,
  updateUser,
} from "@/services/user/userService";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import Header from "../../components/Header";
import Input from "@/app/components/Input";
import { z } from "zod";
import { updateUserSchema } from "@/app/utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "@/app/hooks/useCookies";
import { User } from "@/services/user/userType";

type UpdateuserFormData = z.infer<typeof updateUserSchema>;

export default function UserPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { hasCookie, removeCookie } = useCookies();
  const token = hasCookie({ cookieName: "USER_TOKEN" });
  const user = hasCookie({ cookieName: "USER_DATA" });
  const userData: User = user && JSON.parse(user);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [router, token]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateuserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserById(Number(id));
        setName(response.name);
        setEmail(response.email);
        setType(response.type);
        setPassword(response.password);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  async function handleEditUser(data: UpdateuserFormData) {
    if (userData.type !== "admin") {
      toast.error("Somente usuários admin podem editar usuários");
      return;
    }
    try {
      await updateUser(Number(id), data);
      toast.success("Usuário atualizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao editar usuário. Tente novamente mais tarde.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  async function handleDeleteUser() {
    if (id === '1') {
      toast.error("Não é possível deletar esse usuário!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    } else if (userData.type !== "admin") {
      toast.error("Somente usuários admin podem apagar usuários");
      return;
    } else {
      try {
        await deleteUser(Number(id));
        toast.success("Usuário excluído com sucesso!", {
          position: "top-right",
          autoClose: 3000,
        });
        if (id === String(userData.id)) {
          removeCookie({cookieName: 'USER_TOKEN'});
          return router.push("/");
        }
        router.push("/dashboard");
      } catch (error) {
        console.log("Erro ao deletar usuário", error);
        toast.error("Erro ao deletar usuário. Tente novamente mais tarde.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleEditUser)}
        className="flex flex-col gap-4 w-full max-w-xs py-4"
        action=""
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Header title="Editar usuário" />
          <Icon name="user" />
        </div>
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="id">ID</label>
              <Input
                type="number"
                name="id"
                value={id}
                disabled={true}
                className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
              />
            </div>
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

            <div className="w-full flex justify-between">
              <button
                type="submit"
                className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 w-1/3"
              >
                Editar
              </button>
              <div
                onClick={handleDeleteUser}
                className="bg-red-500 flex justify-center items-center rounded font-semibold text-white h-10 hover:bg-red-600 w-1/3 cursor-pointer"
              >
                Deletar
              </div>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
