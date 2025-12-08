import { User, UserRole } from "@/types/user";
import { UsersTable } from "@/components/users/users-table";
import { CreateUserForm } from "@/components/users/create-user-form";

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    username: "jdoe",
    email: "jdoe@example.com",
    fullName: "John Doe",
    role: UserRole.Collector,
    isActive: true,
    createdAt: new Date("2023-01-15"),
    lastLogin: new Date("2023-10-22"),
  },
  {
    id: 2,
    username: "jsmith",
    email: "jsmith@example.com",
    fullName: "Jane Smith",
    role: UserRole.Manager,
    isActive: true,
    createdAt: new Date("2022-11-20"),
    lastLogin: new Date("2023-10-23"),
  },
  {
    id: 3,
    username: "admin",
    email: "admin@example.com",
    fullName: "Admin User",
    role: UserRole.Admin,
    isActive: true,
    createdAt: new Date("2022-01-01"),
    lastLogin: new Date("2023-10-23"),
  },
];

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">User Management</h1>
      </header>
      
      <div className="mb-8">
        <CreateUserForm />
      </div>

      <UsersTable users={mockUsers} />
    </div>
  );
}
