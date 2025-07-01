// Selects filtered todos based on current list, filter, and search query
export const selectFilteredTodos = (state) => {
  const { lists, currentList, filter, searchQuery } = state;
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
};

// Selects statistics for the current list
export const selectStats = (state) => {
  const todos = state.lists[state.currentList] || [];
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  return {
    total: todos.length,
    active,
    completed,
  };
};
