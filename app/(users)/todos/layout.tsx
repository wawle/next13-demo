import React, { Suspense } from "react";
import TodosList from "./TodosList";

interface Props {
  children: React.ReactNode;
}

const TodoLayout = ({ children }: Props) => {
  return (
    <main className="flex">
      <Suspense fallback={<p>Loading Todos...</p>}>
        <div>
          {/* @ts-ignore */}
          <TodosList />
        </div>
      </Suspense>
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default TodoLayout;
