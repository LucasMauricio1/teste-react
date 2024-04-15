'use client'

import { deleteUser, getAllUsers, getUserById, updateUser } from "@/services/user/userService"
import { GetUserResponse, User } from "@/services/user/userType"
import { useRouter, useParams } from "next/navigation"
import { parseCookies, destroyCookie } from "nookies"
import { toast } from 'react-toastify';
import { useEffect, useState } from "react"
import Icon from "../../components/Icon"
import Header from "../../components/Header"
import Input from "@/app/components/Input"
import { z } from "zod"

const userSchema = z.object({
  email: z.string().email("Insira um e-mail válido.").toLowerCase(),
  name: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
  type: z.enum(["admin", "user"],),
  password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
});

export default function UserPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { id } = params



  const cookies = parseCookies()
  const token = cookies.USER_TOKEN
  const isAuthenticated = !!token;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserById(Number(id));
        setName(response.name);
        setEmail(response.email);
        setType(response.type);
        setPassword(response.password)
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    fetchUser();
  }, [id]);

  async function handleEditUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = userSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      type: formData.get("type") || 'user',
      password: formData.get("password"),
    });

    try {
      await updateUser(Number(id), data)
      toast.success('Usuário atualizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000
      })
      router.push('/dashboard')
    } catch (error) {
      console.log('Erro ao editar usuário', error)
      toast.error('Erro ao editar usuário. Tente novamente mais tarde.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }

  async function handleDeleteUser() {
    const userId = cookies.USER_ID
    if (Number(id) === 1) {
      toast.error('Não é possível deletar esse usuário!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return
    } else {
      try {
        await deleteUser(Number(id))
        toast.success('Usuário excluído com sucesso!', {
          position: 'top-right',
          autoClose: 3000
        })
        if (id === userId) {
          destroyCookie(null, 'USER_ID')
        }
        router.push('/dashboard')
      } catch (error) {
        console.log('Erro ao deletar usuário', error)
        toast.error('Erro ao deletar usuário. Tente novamente mais tarde.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
        onSubmit={handleEditUser}
        className="flex flex-col gap-4 w-full max-w-xs py-4"
        action=""
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Header title="Editar usuário" />
          <Icon name="user" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">ID</label>
          <Input
            type="number"
            name="id"
            value={id}
            disabled={true}
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Nome</label>
          <Input
            type="text"
            name="name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Email</label>
          <Input
            type="email"
            name="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <Input
            type="password"
            name="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Tipo</label>
          <Input
            type="text"
            name="type"
            value={type || ''}
            onChange={(e) => setType(e.target.value)}
            className="border border-zinc-800 text-white shadow-sm rounded h-10 px-3 bg-zinc-900"
          />
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
      </form>
    </main>
  )
} 