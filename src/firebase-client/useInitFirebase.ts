import { FirebaseApp } from "firebase/app";
import { useEffect, useMemo, useState, useContext } from "react";
import { FirebaseContextType } from "../schema/firebase";
import { FIREBASE_EMULATION } from "../utils/constants";
import FirebaseContext, { initialContextValue } from "./context";
import connectToEmulator from "./emulate";

const initFirestoreAndAuth = async () => {
  const { default: initializeFirebase } = await import("./index");
  const app = initializeFirebase();
  return app;
};

const initEmulation = (app: FirebaseApp) => {
  connectToEmulator(app).auth();
  connectToEmulator(app).firestore();
  // connectToEmulator(app).storage();
  connectToEmulator(app).functions();
};

const useInitFirebase: () => FirebaseContextType = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [app, setApp] = useState<FirebaseApp>(initialContextValue.app);

  useEffect(() => {
    initFirestoreAndAuth().then((app) => {
      if (process.env.REACT_APP_FIREBASE_ENV === FIREBASE_EMULATION) {
        initEmulation(app);
      }
      setApp(app);
      setIsInitialized(true);
    });
  }, []);

  const firebase = useMemo(
    () => ({ app, isInitialized }),
    [app, isInitialized]
  );
  return firebase;
};

export const useFirebase = () => {
  const { app } = useContext(FirebaseContext);
  return app;
};

export default useInitFirebase;
