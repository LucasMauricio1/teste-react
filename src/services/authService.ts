import axios from "axios"
import { baseUrl } from "./api"

  export async function login(email: string, password: string) {
    const response = await axios.post(`${baseUrl}/auth`, {
      email,
      password
    })
    return response
  }