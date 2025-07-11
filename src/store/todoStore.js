import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set, get) => ({
      lists: { Home: [] },
      currentList: "Home",
      filter: "all",
      searchQuery: "",

      // Actions

      addTodo: (text, tags = []) => {
        const { currentList } = get();
        const newTodo = {
          id: Date.now(),
          text: text.trim(),
          tags,
          completed: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          lists: {
            ...state.lists,
            [currentList]: [...(state.lists[currentList] || []), newTodo],
          },
        }));
      },

      toggleTodo: (id) => {
        const { currentList } = get();
        set((state) => ({
          lists: {
            ...state.lists,
            [currentList]: (state.lists[currentList] || []).map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          },
        }));
      },

      deleteTodo: (id) => {
        const { currentList } = get();
        set((state) => ({
          lists: {
            ...state.lists,
            [currentList]: (state.lists[currentList] || []).filter(
              (todo) => todo.id !== id,
            ),
          },
        }));
      },

      clearCompleted: () => {
        const { currentList } = get();
        set((state) => ({
          lists: {
            ...state.lists,
            [currentList]: (state.lists[currentList] || []).filter(
              (todo) => !todo.completed,
            ),
          },
        }));
      },

      setCurrentList: (listName) => set({ currentList: listName }),
      createList: (listName) => {
        const { lists } = get();
        if (lists[listName]) {
          return false; // List already exists
        }
        set((state) => ({
          lists: {
            ...state.lists,
            [listName]: [],
          },
        }));
        return true; // List created successfully
      },

      deleteList: (listName) => {
        const newLists = { ...get().lists };
        delete newLists[listName];
        set({ lists: newLists });
      },

      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "todo-storage",
    },
  ),
);
