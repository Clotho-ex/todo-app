import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const NewListForm = () => {
  const [listName, setListName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const createList = useTodoStore((state) => state.createList);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!listName.trim()) {
      // Trigger rocking shake animation for empty input
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800);
      return;
    }

    const success = createList(listName.trim());
    if (success) {
      setIsAnimating(true);
      setListName("");
      setTimeout(() => setIsAnimating(false), 600);
    } else {
      toast.error(`List "${listName.trim()}" already exists!`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`mb-4 flex items-center justify-center rounded-lg border p-3 shadow-sm transition-all duration-300 hover:cursor-pointer hover:shadow-md ${
        isShaking
          ? "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20"
          : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
      } dark:hover:shadow-lg`}
      animate={
        isShaking
          ? {
              rotate: [0, -14, 14, -12, 12, -10, 10, 0],
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
          : isAnimating
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  "0 0 0 2px rgb(34 197 94 / 0.5), 0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                ],
              }
            : {}
      }
      transition={{
        duration: isShaking ? 0.5 : 0.4,
        ease: isShaking ? "easeInOut" : "easeInOut",
      }}
    >
      <div className="flex w-full items-center justify-center">
        <input
          className="w-full border-none bg-transparent text-neutral-900 placeholder-neutral-500 outline-none focus:ring-0 dark:text-neutral-100 dark:placeholder-neutral-400"
          autoFocus
          type="text"
          placeholder="New List"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="ml-2 rounded-full p-1.5 text-neutral-600 transition-all duration-300 hover:scale-110 hover:bg-neutral-200 hover:text-neutral-800 hover:shadow-sm dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        <PlusCircleIcon className="h-5 w-5" />
      </button>
    </motion.form>
  );
};

export default NewListForm;
