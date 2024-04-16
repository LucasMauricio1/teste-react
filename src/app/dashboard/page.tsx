"use client";

import { getAllUsers } from "@/services/user/userService";
import { User } from "@/services/user/userType";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { UsersTable } from "../components/Table/UsersTable";

export default function Dashboard() {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.USER_TOKEN;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = !!token;

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }

  const handleCreateUser = () => {
    router.push(`/criar-usuario`);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center gap-4">
      <div className="pt-4">
        <Header title="Listagem dos usuários:" />
      </div>
      <div>
        <UsersTable />
        <div className="flex justify-center w-full">
          <button
            onClick={handleCreateUser}
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 w-full px-5"
          >
            Cadastrar usuário
          </button>
        </div>
      </div>
    </main>
  );
}
