"use client";

import type { Todo } from "@/app/api/todos/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  getTodoErrorMessage,
  handleApiError,
  TodoErrorCode,
} from "@/lib/utils/error-utils";
import { Loader2, Trash2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";

interface TodoListProps {
  initialTodos: Todo[];
}

// Error message helper
const createErrorMessage = (action: string, error: unknown) => {
  const apiError = handleApiError(error);
  return {
    title: `Failed to ${action}`,
    description: apiError.code
      ? getTodoErrorMessage(apiError.code as TodoErrorCode)
      : apiError.message,
    variant: "destructive" as const,
  };
};

// API layer abstraction
const todoApi = {
  create: async (text: string): Promise<Todo> => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
  },
  update: async (todo: Todo, updates: Partial<Todo>): Promise<Todo> => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, ...updates }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  },
  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete todo");
  },
};

const handleKeyDown = (handler: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    handler();
  }
};

const getEditFormContent = (
  todo: Todo,
  editText: string,
  setEditText: (value: string) => void,
  handleUpdateTodo: (todo: Todo, text: string) => void,
  setEditingId: (id: string | null) => void,
  isPending: boolean,
) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateTodo(todo, editText);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setEditingId(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 gap-2"
      aria-label={`Edit todo "${todo.text}"`}
      onBlur={handleBlur}
    >
      <Input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="flex-1"
        autoFocus
        aria-label="Edit todo text"
        disabled={isPending}
      />
      <Button
        type="submit"
        size="sm"
        className="whitespace-nowrap"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kaydet"}
      </Button>
    </form>
  );
};

const getTodoContent = (
  todo: Todo,
  handleStartEditing: (todo: Todo) => void,
) => (
  <span
    className={`flex-1 cursor-pointer ${
      todo.completed ? "text-muted-foreground line-through" : ""
    }`}
    onDoubleClick={() => handleStartEditing(todo)}
    role="button"
    tabIndex={0}
    onKeyDown={handleKeyDown(() => handleStartEditing(todo))}
    aria-label={`${todo.text} (double click to edit)`}
  >
    {todo.text}
  </span>
);

// Utility functions for state updates
const updateTodoInList = (todos: Todo[], updatedTodo: Todo) =>
  todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));

const toggleTodoInList = (todos: Todo[], todoId: string) =>
  todos.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t));

const updateTodoTextInList = (todos: Todo[], todoId: string, newText: string) =>
  todos.map((t) => (t.id === todoId ? { ...t, text: newText } : t));

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setIsLoading(true);
    try {
      const todo = await todoApi.create(newTodo);
      setTodos((prev) => [...prev, todo]);
      setNewTodo("");
      toast({ title: "Todo added successfully" });
    } catch (error) {
      toast(createErrorMessage("add todo", error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = useCallback(
    async (todo: Todo) => {
      setTodos((prev) => toggleTodoInList(prev, todo.id));

      try {
        const updatedTodo = await todoApi.update(todo, {
          completed: !todo.completed,
        });
        setTodos((prev) => updateTodoInList(prev, updatedTodo));
      } catch (error) {
        setTodos((prev) => updateTodoInList(prev, todo));
        toast(createErrorMessage("update todo", error));
      }
    },
    [toast],
  );

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      const previousTodos = [...todos];
      setTodos((prev) => prev.filter((t) => t.id !== id));

      try {
        await todoApi.delete(id);
        toast({ title: "Todo deleted successfully" });
      } catch (error) {
        setTodos(previousTodos);
        toast(createErrorMessage("delete todo", error));
      }
    },
    [todos, toast],
  );

  const handleUpdateTodo = useCallback(
    async (todo: Todo, newText: string) => {
      if (!newText.trim() || newText === todo.text) {
        setEditingId(null);
        return;
      }

      const previousTodos = [...todos];
      setTodos((prev) => updateTodoTextInList(prev, todo.id, newText));

      try {
        const updatedTodo = await todoApi.update(todo, { text: newText });
        startTransition(() => {
          setTodos((prev) => updateTodoInList(prev, updatedTodo));
        });
        setEditingId(null);
        toast({ title: "Todo updated successfully" });
      } catch (error) {
        setTodos(previousTodos);
        toast(createErrorMessage("update todo text", error));
      }
    },
    [todos, toast],
  );

  const handleStartEditing = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  }, []);

  const renderTodoItem = useCallback(
    (todo: Todo) => (
      <li
        key={todo.id}
        className="flex items-center gap-2 rounded-lg bg-card p-4 shadow-sm"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo)}
          className="h-4 w-4"
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
        />
        {editingId === todo.id
          ? getEditFormContent(
              todo,
              editText,
              setEditText,
              handleUpdateTodo,
              setEditingId,
              isPending,
            )
          : getTodoContent(todo, handleStartEditing)}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteTodo(todo.id)}
          aria-label={`Delete todo "${todo.text}"`}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </li>
    ),
    [
      editingId,
      editText,
      handleDeleteTodo,
      handleStartEditing,
      handleToggleTodo,
      handleUpdateTodo,
      isPending,
    ],
  );

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className="mb-8 flex gap-2"
        aria-label="Add new todo form"
      >
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-1"
          aria-label="New todo text"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ekle"}
        </Button>
      </form>

      <ul className="space-y-2" aria-label="Todo list">
        {todos.map(renderTodoItem)}
      </ul>
    </>
  );
}
