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
      className="mb-4 flex items-center justify-center rounded-lg bg-white p-2 shadow-md transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
      animate={
        isAnimating
          ? {
              scale: [1, 1.05, 1],
              backgroundColor: ["#ffffff", "#dcfce7", "#ffffff"],
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex w-full items-center justify-center space-x-2">
        <input
          className="w-full border-none bg-transparent text-gray-700 placeholder-gray-400 outline-none focus:ring-0"
          autoFocus
          type="text"
          placeholder="New List"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <button type="submit">
        <PlusCircleIcon className="ml-2 h-5 w-5 rounded-full transition-transform duration-300 hover:scale-110 hover:cursor-pointer hover:bg-green-100 hover:text-green-700" />
      </button>
    </motion.form>
  );
};

export default NewListForm;
