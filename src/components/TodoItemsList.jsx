import { useTodoStore } from "../store/todoStore";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoItemsList = () => {
  const lists = useTodoStore((state) => state.lists);
  const currentList = useTodoStore((state) => state.currentList);
  const filter = useTodoStore((state) => state.filter);
  const searchQuery = useTodoStore((state) => state.searchQuery);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousFilter = useRef(filter);

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

  useEffect(() => {
    if (previousFilter.current !== filter) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      previousFilter.current = filter;
      return () => clearTimeout(timer);
    }
  }, [filter]);

  if (todos.length === 0) {
    return (
      <motion.div
        className="py-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        key={`empty-${filter}`}
      >
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {filter === "all" && todos.length === 0
            ? "No tasks here. Add one!"
            : filter === "completed" && todos.length === 0
              ? "No completed tasks."
              : filter === "active" && todos.length === 0
                ? "No active tasks."
                : ""}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0.7 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.ul
          className="space-y-1.5"
          key={filter}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isTransitioning ? 0.3 : 0,
            staggerChildren: isTransitioning ? 0.05 : 0,
          }}
        >
          {todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: isTransitioning ? 0.3 : 0,
                delay: isTransitioning ? index * 0.03 : 0,
              }}
            >
              <TodoItem todo={todo} />
            </motion.div>
          ))}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoItemsList;
