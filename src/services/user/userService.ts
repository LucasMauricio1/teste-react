import axios from "axios";
import { baseUrl } from "../api";
import {
  CreateUser,
  CreateUserResponse,
  GetUserResponse,
  UpdateUser,
} from "./userType";
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

export async function getUserById(id: number): Promise<GetUserResponse> {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    throw error;
  }
}

export async function createUser(
  data: CreateUser
): Promise<{ user: CreateUserResponse; status: number }> {
  try {
    if (!data.type || data.type !== "admin") {
      data.type = "user";
    }

    const response = await axiosInstance.post("/user", { data });
    return {
      user: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function updateUser(
  id: number,
  data: Partial<UpdateUser>
): Promise<{ user: CreateUserResponse; status: number }> {
  try {
    if (!data.type || data.type !== "admin") {
      data.type = "user";
    }

    const response = await axiosInstance.patch(`user/${id}`, {
      email: data.email,
      name: data.name,
      password: data.password,
      type: data.type,
    });
    return { user: response.data, status: response.status };
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error;
  }
}

export async function deleteUser(id: number): Promise<{ status: number }> {
  try {
    const { status } = await axiosInstance.delete(`user/${id}`);
    return { status };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}
