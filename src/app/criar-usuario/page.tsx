"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Icon from "../components/Icon";
import Header from "../components/Header";
import { useCookies } from "../hooks/useCookies";
import { CreateUserForm } from "../components/Forms/CreateUserForm";

export default function CreateUser() {
  const router = useRouter();

  const { hasCookie } = useCookies();
  const token = hasCookie({ cookieName: "USER_TOKEN" });

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [router, token]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <Header title="Cadastrar usuário" />
        <Icon name="plus" />
      </div>
      <CreateUserForm />
    </main>
  );
}
