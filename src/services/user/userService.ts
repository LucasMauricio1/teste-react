import axios from "axios";
import { baseUrl } from "../api";
import { CreateUser, CreateUserResponse } from "./userType";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const accessToken = cookies.USER_TOKEN;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export async function getAllUsers(): Promise<CreateUserResponse> {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}

export async function createUser(
  data: CreateUser
): Promise<CreateUserResponse> {
  try {
    if (!data.type || data.type !== "admin") {
      data.type = "user";
    }

    const response = await axiosInstance.post("/user", { data });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
