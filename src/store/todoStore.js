import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set, get) => ({
      lists: { default: [] },
      currentList: "default",
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
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
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
              (todo) => todo.id !== id
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
              (todo) => !todo.completed
            ),
          },
        }));
      },

      setCurrentList: (listName) => set({ currentList: listName }),
      createList: (listName) =>
        set((state) => ({
          lists: {
            ...state.lists,
            [listName]: state.lists[listName] || [],
          },
        })),

      deleteList: (listName) => {
        const newLists = { ...get().lists };
        delete newLists[listName];
        set({ lists: newLists });
      },

      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Computed values

      get filteredTodos() {
        const { lists, currentList, filter, searchQuery } = get();
        let todos = lists[currentList] || [];

        if (filter === "active")
          todos = todos.filter((todo) => !todo.completed);

        if (filter === "completed")
          todos = todos.filter((todo) => todo.completed);

        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          todos = todos.filter(
            (todo) =>
              todo.text.toLowerCase().includes(q) ||
              todo.tags.some((tag) => tag.toLowerCase().includes(q))
          );
        }
        return todos;
      },

      get stats() {
        const todos = get().lists[get().currentList] || [];
        const completed = todos.filter((todo) => todo.completed).length;
        const active = todos.length - completed;
        return {
          total: todos.length,
          active,
          completed,
        };
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
