import ListSidebar from "./components/ListSidebar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <ListSidebar />
    </>
  );
}

export default App;
