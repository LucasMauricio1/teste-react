'use client'

import { getAllUsers } from "@/services/user/userService";
import { User } from "@/services/user/userType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UsersTable() {
  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter()

  async function fetchUsers() {
    try {
      const response = await getAllUsers();
      if (Array.isArray(response)) {
        const users: User[] = response.map((user: User) => user);
        setUsers(users);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [router])

  const handleUserClick = (userId: number) => {
    router.push(`/usuario/${userId}`);
    setUsers([]);
  };

  return (
    <>
      {loading ? (
        <div className="text-white">Carregando...</div>
      ) : (
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
        </div>
      )}
    </>
  )
}