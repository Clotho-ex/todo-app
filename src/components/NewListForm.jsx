import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const NewListForm = () => {
  const [listName, setListName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const createList = useTodoStore((state) => state.createList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listName.trim()) return;

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
      className="mb-4 flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-3 shadow-sm transition-all duration-300 hover:cursor-pointer hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:shadow-lg"
      animate={
        isAnimating
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
      transition={{ duration: 0.6, ease: "easeInOut" }}
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
