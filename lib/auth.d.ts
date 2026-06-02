export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
