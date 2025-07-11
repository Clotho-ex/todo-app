import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import NewListForm from "./NewListForm";
import {
  TrashIcon,
  XMarkIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const ListSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lists = useTodoStore((s) => s.lists);
  const currentList = useTodoStore((s) => s.currentList);
  const setCurrentList = useTodoStore((s) => s.setCurrentList);
  const deleteList = useTodoStore((s) => s.deleteList);

  const listNames = Object.keys(lists);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleListSelect = (name) => {
    setCurrentList(name);
    // Close sidebar on mobile after selecting a list
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile hamburger menu button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-7 left-7 z-50 cursor-pointer rounded-lg border border-neutral-200 bg-neutral-100 p-2 text-neutral-700 shadow-md transition-all duration-200 hover:bg-neutral-200 hover:shadow-lg lg:hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 ${
          isOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>

      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed z-50 h-screen transform border-r border-neutral-200 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-full lg:translate-x-0 lg:shadow-none dark:border-neutral-700 dark:bg-neutral-900 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col overflow-hidden`}
      >
        {/* Mobile close button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-500 transition-colors duration-200 hover:bg-neutral-200 hover:text-neutral-700 lg:hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div className="flex-shrink-0 p-4">
          <h2 className="mt-4 mb-7 text-center text-lg font-bold text-neutral-600 dark:text-neutral-200">
            Just Do It
          </h2>
          <NewListForm />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <ul className="m-0 list-none space-y-1.5 p-0">
            {listNames.map((name) => (
              <li
                key={name}
                onClick={() => handleListSelect(name)}
                className={`group flex cursor-pointer items-center justify-between rounded-md border px-2 py-1.5 transition-all duration-200 ${
                  name === currentList
                    ? "border-neutral-200 bg-neutral-50 font-semibold text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                    : "border-transparent text-neutral-700 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                }`}
              >
                <span className="truncate">{name}</span>
                {name !== "Home" && (
                  <button
                    className="cursor-pointer rounded-full p-1 text-neutral-400 transition-all duration-100 hover:scale-115 hover:bg-red-100 hover:text-red-600 hover:shadow-sm dark:text-neutral-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
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
        </div>
      </aside>
    </>
  );
};

export default ListSidebar;
