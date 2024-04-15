'use client'

import { getAllUsers } from "@/services/user/userService"
import { User } from "@/services/user/userType"
import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const router = useRouter()
  const cookies = parseCookies()
  const token = cookies.USER_TOKEN

  const [users, setUsers] = useState<User[]>([])

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        if (Array.isArray(response)) {
          const users: User[] = response.map((user: User) => (user)) 
          setUsers(users)
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    fetchUsers();
  }, []);
  console.log(users)
  return <h1>Hello World</h1>;
} 