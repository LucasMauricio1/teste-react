import { createUserSchema } from "@/app/utils/schemas";
import { createUser } from "@/services/user/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Input from "../Input";

type CreateUserFormData = z.infer<typeof createUserSchema>;

export function CreateUserForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

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
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="flex flex-col gap-4 w-full max-w-xs"
      action=""
    >
      <>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <Input
            {...register("name")}
            type="text"
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
    </form>
  );
}
