export enum UserRole {
  Collector = "collector",
  Manager = "manager",
  Admin = "admin",
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date | null;
}
