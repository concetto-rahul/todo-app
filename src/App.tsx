import Router from "./routes";
import { TaskContextProvider } from "./context/task";
import FirebaseContext from "./firebase-client/context";
import useInitFirebase from "./firebase-client/useInitFirebase";
import LoadingScreen from "./components/LoadingScreen";
function App() {
  const firebase=useInitFirebase();
  const { isInitialized } = firebase;
  return (
    <>
      <FirebaseContext.Provider value={firebase}>
        <TaskContextProvider>
          {isInitialized ? <Router /> : <LoadingScreen />}
        </TaskContextProvider>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;
