import { TodoList } from "@/app/(admin)/todos/_components/todo-list";
import type { Todo } from "@/app/api/todos/route";

async function fetchTodoList(): Promise<Todo[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/todos`,
    {
      cache: "no-store",
      next: {
        tags: ["todos"],
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`);
  }

  return res.json();
}

export default async function TodosPage() {
  const initialTodos = await fetchTodoList();

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Todo List</h1>
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}
