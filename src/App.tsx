import Router from "./routes";
import { TaskContextProvider } from "./context/task";
import { ChatContextProvider } from "./context/chat";
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
        <ChatContextProvider>
          {isInitialized ? <Router /> : <LoadingScreen />}
      </ChatContextProvider>
        </TaskContextProvider>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;
