export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

export interface CreateUser {
  name: string;
  email: string;
  type?: "user" | "admin";
  password: string;
}

export interface CreateUserResponse extends User {}

export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  type: string;
  password: string;
}

export interface UpdateUser extends CreateUser{}