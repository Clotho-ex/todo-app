import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const AddTodoForm = () => {
  const [text, setText] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      // Trigger rocking shake animation for empty input
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800);
      return;
    }

    addTodo(text.trim());
    setText("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`mb-3 flex items-center gap-2 rounded-md border p-1 shadow-sm transition-all duration-300 ${
        isShaking
          ? "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20"
          : "border-neutral-300 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:focus-within:border-neutral-600 dark:focus-within:ring-neutral-600"
      }`}
      animate={
        isShaking
          ? {
              rotate: [0, -40, 40, -20, 20, -10, 10, 0],
              transformOrigin: [
                "20% 20%", // top left
                "80% 80%", // bottom right
                "20% 20%", // top left
                "80% 80%", // bottom right
                "20% 20%", // top left
                "80% 80%", // bottom right
                "50% 50%", // center
                "50% 50%", // center
              ],
            }
          : {}
      }
      transition={{
        duration: isShaking ? 0.5 : 0.4,
        ease: "easeInOut",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to get done?"
        className="flex-1 rounded-md border-0 bg-transparent px-2 py-1.5 text-sm placeholder-neutral-400 focus:ring-0 focus:outline-none dark:text-neutral-200 dark:placeholder-neutral-500"
      />
      <button
        type="submit"
        className="ml-2 cursor-pointer rounded-full p-1.5 text-neutral-600 transition-all duration-300 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        <PlusCircleIcon className="h-5 w-5" />
      </button>
    </motion.form>
  );
};

export default AddTodoForm;
