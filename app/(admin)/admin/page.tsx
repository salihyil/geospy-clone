import { handleApiError } from "@/lib/utils/error-utils";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 3600 }, // 1 saat cache
    });
    if (!res.ok) throw new Error("Veri çekme hatası");
    return res.json();
  } catch (error) {
    throw handleApiError(error);
  }
}

export default async function AdminPage() {
  const users = await getData();

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4">
        {users.map((user: User) => (
          <div key={user.id} className="rounded-lg border p-4 shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
