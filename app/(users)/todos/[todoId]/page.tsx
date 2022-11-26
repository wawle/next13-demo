import React from "react";
import { Todo } from "../../../../typing";
import { notFound } from "next/navigation";

export const dynamicProps = true;

interface Props {
  params: {
    todoId: string;
  };
}

const fetchTodoById = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  );
  const todo: Todo = await res.json();
  return todo;
};

const TodoPage = async ({ params }: Props) => {
  const { todoId } = params;
  const todo = await fetchTodoById(todoId);
  // if todo is not exists return 404
  if (!todo.id) return notFound();

  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>

      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
};

export default TodoPage;

export async function generateStaticParams() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?page=${0}&_limit=${10}`
  );
  const todos: Todo[] = await res.json();

  return todos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
