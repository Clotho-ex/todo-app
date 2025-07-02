import { useTodoStore } from "../store/todoStore";
import { useMemo } from "react";
import TodoItem from "./TodoItem";

const TodoItemsList = () => {
  const lists = useTodoStore((state) => state.lists);
  const currentList = useTodoStore((state) => state.currentList);
  const filter = useTodoStore((state) => state.filter);
  const searchQuery = useTodoStore((state) => state.searchQuery);

  const todos = useMemo(() => {
    let todos = lists[currentList] || [];

    if (filter === "active") todos = todos.filter((todo) => !todo.completed);
    if (filter === "completed") todos = todos.filter((todo) => todo.completed);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      todos = todos.filter(
        (todo) =>
          todo.text.toLowerCase().includes(q) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return todos;
  }, [lists, currentList, filter, searchQuery]);

  if (todos.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {filter === "all" && todos.length === 0
            ? "No tasks here. Add one!"
            : filter === "completed" && todos.length === 0
              ? "No completed tasks."
              : filter === "active" && todos.length === 0
                ? "No active tasks."
                : ""}
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-1.5">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoItemsList;
