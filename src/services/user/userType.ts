interface User {
  id: number;
  email: string;
  name: string;
  type: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
