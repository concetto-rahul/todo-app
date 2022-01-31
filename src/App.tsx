import Router from "./routes";
import { TaskContextProvider } from "./context/task";
import { ChatContextProvider } from "./context/chat";
import FirebaseContext from "./firebase-client/context";
import useInitFirebase from "./firebase-client/useInitFirebase";
import LoadingScreen from "./components/LoadingScreen";
import { SocketContextProvider } from "./context/socket";

function App() {
  const firebase = useInitFirebase();
  const { isInitialized } = firebase;
  const id = localStorage.getItem("chat-userID") || "";
  return (
    <>
      <FirebaseContext.Provider value={firebase}>
        <SocketContextProvider id={id}>
          <TaskContextProvider>
            <ChatContextProvider>
              {isInitialized ? <Router /> : <LoadingScreen />}
            </ChatContextProvider>
          </TaskContextProvider>
        </SocketContextProvider>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;
