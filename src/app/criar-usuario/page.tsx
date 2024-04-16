"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Icon from "../components/Icon";
import Header from "../components/Header";
import { useCookies } from "../hooks/useCookies";
import { CreateUserForm } from "../components/Forms/CreateUserForm";
import { User } from "@/services/user/userType";

export default function CreateUser() {
  const router = useRouter();

  const { hasCookie } = useCookies();
  const token = hasCookie({ cookieName: "USER_TOKEN" });
  const user = hasCookie({ cookieName: "USER_DATA" });
  const userData: User = user && JSON.parse(user)

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    } else if (userData.type !== "admin") {
      router.push("/dashboard");
      return;
    }
  }, [router, token, userData.type]);

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
