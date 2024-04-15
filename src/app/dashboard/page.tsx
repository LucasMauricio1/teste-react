'use client'

import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"

export default function Dashboard() {
  const router = useRouter()
  const cookies = parseCookies()
  const token = cookies.USER_TOKEN

    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }
  
    console.log("token: ", token);
    return <h1>Hello World</h1>;
} 