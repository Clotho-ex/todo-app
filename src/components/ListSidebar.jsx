import { useTodoStore } from "../store/todoStore";
import NewListForm from "./NewListForm";
import { TrashIcon } from "@heroicons/react/24/outline";

const ListSidebar = () => {
  const { lists, currentList, setCurrentList, deleteList } = useTodoStore();
  const listNames = Object.keys(lists);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 overflow-y-auto rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-4 text-center text-lg font-bold text-gray-700">
        Lists
      </h2>
      <NewListForm />
      <ul className="m-0 list-none space-y-2 p-0 text-gray-700">
        {listNames.map((name) => (
          <li
            key={name}
            onClick={() => setCurrentList(name)}
            className={`flex cursor-pointer items-center justify-between p-2 ${
              name === currentList ? "font-bold" : ""
            }`}
          >
            {name}
            {name !== "default" && (
              <button
                className="ml-2 rounded-full p-1 text-red-500 transition-transform duration-300 hover:scale-110 hover:cursor-pointer hover:bg-red-100 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(name);
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ListSidebar;
