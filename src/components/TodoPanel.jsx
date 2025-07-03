import AddTodoForm from "./AddTodoForm";
import TodoItemsList from "./TodoItemsList";
import TodoFilter from "./TodoFilter";

export function TodoPanel() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex-shrink-0 pt-3 mr-3 pl-3">
        <AddTodoForm />
        <TodoFilter />
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <TodoItemsList />
      </div>
    </div>
  );
}
