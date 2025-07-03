import { useTodoStore } from "../store/todoStore";
import { TrashIcon } from "@heroicons/react/24/outline";

const TodoItem = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="dark:hover:bg-neutral-750 mt-3 flex w-full items-center gap-2.5 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1.5 transition-colors duration-200 group-hover:bg-neutral-900 hover:bg-neutral-200 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
      <input
        className="h-4 w-4 cursor-pointer border-none border-neutral-300 bg-neutral-100 accent-green-500 focus:ring-0 dark:border-neutral-600 dark:bg-neutral-700"
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
        className="cursor-pointer rounded-full p-1 text-neutral-400 transition-all duration-200 hover:scale-115 hover:bg-red-100 hover:text-red-600 hover:shadow-sm dark:text-neutral-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        aria-label="Delete todo"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </li>
  );
};

export default TodoItem;
