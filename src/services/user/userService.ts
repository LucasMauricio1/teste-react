import axios from "axios";
import { baseUrl } from "../api";
import { LoginResponse } from "./userType";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await axios.post(`${baseUrl}/auth`, {
    email,
    password,
  });

  const accessToken = response.data.accessToken;
  const user = response.data.user;

  return { accessToken, user };
}
