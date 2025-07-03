import { useTodoStore } from "../store/todoStore";

const FILTERS = ["all", "active", "completed"];

const TodoFilter = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <div className="flex justify-center gap-4 text-neutral-500 dark:text-neutral-200">
      {FILTERS.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={`rounded-md px-2 py-1 cursor-pointer text-center text-sm font-medium transition-colors hover:bg-neutral-200 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 ${
            filter === filterOption
              ? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
              : "bg-neutral-100 dark:bg-neutral-800"
          }`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
