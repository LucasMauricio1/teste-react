import Header from "./components/Header";
import { LoginForm } from "./components/Forms/LoginForm";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Login() {
  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 py-4 items-center">
        <Header title="Bem vindo(a)!"/>
        <UserIcon className={`h-12 w-12`} />
      </div>
      <LoginForm />
    </main>
  );
}
