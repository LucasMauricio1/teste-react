"use client";

import { getAllUsers } from "@/services/user/userService";
import { User } from "@/services/user/userType";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.USER_TOKEN;

  const [users, setUsers] = useState<User[]>([]);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        if (Array.isArray(response)) {
          const users: User[] = response.map((user: User) => user);
          setUsers(users);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    fetchUsers();
  }, [isAuthenticated]);

  const handleUserClick = (userId: number) => {
    router.push(`/usuario/${userId}`);
    setUsers([]);
  };

  const handleCreateUser = () => {
    router.push(`/criar-usuario`);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center gap-4">
      <div className="pt-4">
        <Header title="Listagem dos usuários:" />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs items-center pb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300 bg-gray-600">ID</th>
              <th className="p-3 border border-gray-300 bg-gray-600">Nome</th>
              <th className="p-3 border border-gray-300 bg-gray-600">E-mail</th>
              <th className="p-3 border border-gray-300 bg-gray-600">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className="cursor-pointer hover:opacity-80"
                >
                  <td className="p-3 border border-gray-300">{user.id}</td>
                  <td className="p-3 border border-gray-300">{user.name}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">{user.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <div className="flex justify-center w-full">
            <button
              onClick={handleCreateUser}
              className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 w-full px-5"
            >
              Cadastrar usuário:
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
