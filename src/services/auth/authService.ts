import axios from "axios";
import { baseUrl } from "../api";
import { LoginResponse } from "./authType";

export async function login(
  email: string,
  password: string
): Promise<{result: LoginResponse, status: number}> {
  const response = await axios.post(`${baseUrl}/auth`, {
    email,
    password,
  });

  return { result: response.data, status: response.status };
}
