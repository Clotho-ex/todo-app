import { useTodoStore } from "../store/todoStore";
import { motion } from "framer-motion";

const FILTERS = ["all", "active", "completed"];

const TodoFilter = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <div className="flex justify-center gap-1 text-neutral-500 dark:text-neutral-200">
      {FILTERS.map((filterOption) => (
        <motion.button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={`relative cursor-pointer rounded-md px-3 py-1 text-center text-sm font-medium transition-colors hover:text-neutral-800 dark:hover:text-neutral-200 ${
            filter === filterOption
              ? "text-neutral-800 dark:text-neutral-200"
              : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {filter === filterOption && (
            <motion.div
              className="absolute inset-0 rounded-md bg-neutral-200 dark:bg-neutral-700"
              layoutId="activeFilter"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          )}
          <span className="relative z-10">
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default TodoFilter;
