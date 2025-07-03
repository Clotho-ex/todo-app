import { useTodoStore } from "../store/todoStore";
import { useMemo } from "react";

const TodoFooter = () => {
  const lists = useTodoStore((state) => state.lists);
  const currentList = useTodoStore((state) => state.currentList);

  const stats = useMemo(() => {
    const todos = lists[currentList] || [];
    const completed = todos.filter((todo) => todo.completed).length;
    const active = todos.length - completed;
    return {
      total: todos.length,
      active,
      completed,
    };
  }, [lists, currentList]);

  if (stats.total === 0) {
    return null;
  }

  return (
    <footer className="mt-4 flex-shrink-0 border-t border-neutral-200 pt-4 dark:border-neutral-700">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            {stats.total}
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Total
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {stats.active}
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Active
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">
            {stats.completed}
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Completed
          </span>
        </div>
      </div>
    </footer>
  );
};

export default TodoFooter;
