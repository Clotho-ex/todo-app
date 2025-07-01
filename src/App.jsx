import ListSidebar from "./components/ListSidebar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
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
      <main className="ml-64 flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            <h1 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Welcome to Your Todo App
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Select a list from the sidebar to get started, or create a new
              list.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
