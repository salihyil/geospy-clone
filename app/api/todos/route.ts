import { NextResponse } from "next/server";

// Basit bir in-memory storage
let todos: Todo[] = [];

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newTodo: Todo = {
    id: Math.random().toString(36).substring(7),
    text: body.text,
    completed: false,
    createdAt: new Date(),
  };
  
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const todoIndex = todos.findIndex(todo => todo.id === body.id);
  
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...body };
  return NextResponse.json(todos[todoIndex]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  
  todos = todos.filter(todo => todo.id !== id);
  return NextResponse.json({ success: true });
} 