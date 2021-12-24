import Router from "./routes";
import { TaskContextProvider } from "./context/task";
function App() {
  return (
    <>
    <TaskContextProvider>
      <Router />
    </TaskContextProvider>
    </>
  );
}

export default App;
