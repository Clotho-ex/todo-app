import { useTodoStore } from "../store/todoStore";
import { TrashIcon } from "@heroicons/react/24/outline";

const TodoItem = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="group dark:hover:bg-neutral-750 flex w-full items-center gap-2.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 transition-colors duration-200 hover:bg-neutral-900 dark:border-neutral-700 dark:bg-neutral-800">
      <input
        className="h-4 w-4 cursor-pointer border-neutral-300 bg-neutral-100 text-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700"
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        className={`flex-1 text-left text-sm transition-all duration-200 ${
          todo.completed
            ? "text-neutral-400 line-through dark:text-neutral-400"
            : "text-neutral-700 dark:text-neutral-200"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 rounded-full p-1.5 text-neutral-400 transition-all duration-200 hover:scale-110 hover:cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm dark:text-neutral-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        aria-label="Delete todo"
      >
        <TrashIcon className="h-3.5 w-3.5" />
      </button>
    </li>
  );
};

export default TodoItem;
