import ListSidebar from "./components/ListSidebar";
import { Toaster } from "react-hot-toast";
import { useTodoStore } from "./store/todoStore";
import { TodoPanel } from "./components/TodoPanel";
import TodoFooter from "./components/TodoFooter";

function App() {
  const currentList = useTodoStore((state) => state.currentList);

  return (
    <div className="font-geist grid h-screen grid-cols-1 overflow-hidden bg-neutral-50 lg:grid-cols-[256px_1fr] dark:bg-neutral-950">
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "8px",
            background: "rgb(38 38 38)",
            color: "rgb(245 245 245)",
            border: "1px solid rgb(82 82 82)",
          },
          success: {
            style: {
              background: "rgb(21 128 61)",
              color: "white",
              border: "1px solid rgb(34 197 94)",
            },
          },
          error: {
            style: {
              background: "rgb(153 27 27)",
              color: "white",
              border: "1px solid rgb(239 68 68)",
            },
          },
        }}
      />

      <ListSidebar />

      {/* Main content area */}
      <main className="m-3 flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 p-4 shadow-lg lg:col-start-2 dark:border-neutral-700">
        <div className="mx-auto flex h-full w-full max-w-full flex-col">
          <h1 className="mb-4 flex-shrink-0 text-center text-2xl font-semibold tracking-tight text-neutral-600 dark:text-neutral-100">
            {currentList}
          </h1>
          <TodoPanel />
          <TodoFooter />
        </div>
      </main>
    </div>
  );
}

export default App;
