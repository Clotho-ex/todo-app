import { useTodoStore } from "../store/todoStore";
import NewListForm from "./NewListForm";
import { TrashIcon } from "@heroicons/react/24/outline";

const ListSidebar = () => {
  const lists = useTodoStore((s) => s.lists);
  const currentList = useTodoStore((s) => s.currentList);
  const setCurrentList = useTodoStore((s) => s.setCurrentList);
  const deleteList = useTodoStore((s) => s.deleteList);

  const listNames = Object.keys(lists);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 overflow-y-auto border-r border-neutral-200 bg-neutral-100 p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      <h2 className="mb-4 text-center text-lg font-bold text-neutral-800 dark:text-neutral-200">
        Lists
      </h2>
      <NewListForm />
      <ul className="m-0 list-none space-y-2 p-0">
        {listNames.map((name) => (
          <li
            key={name}
            onClick={() => setCurrentList(name)}
            className={`group flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 transition-all duration-200 ${
              name === currentList
                ? "border-neutral-300 bg-neutral-200 font-semibold text-neutral-900 shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                : "border-transparent text-neutral-700 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 hover:shadow-sm dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            }`}
          >
            <span className="truncate">{name}</span>
            {name !== "default" && (
              <button
                className="ml-2 rounded-full p-1.5 text-neutral-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm dark:text-neutral-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(name);
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ListSidebar;
