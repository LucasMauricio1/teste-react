"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";
import { UsersTable } from "../components/Table/UsersTable";
import { useCookies } from "../hooks/useCookies";

export default function Dashboard() {
  const router = useRouter();

  const { hasCookie } = useCookies();
  const token = hasCookie({ cookieName: "USER_TOKEN" });

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [router, token]);

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
