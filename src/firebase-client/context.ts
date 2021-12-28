import { FirebaseApp } from "firebase/app";
import { createContext } from "react";
import { FirebaseContextType } from "../schema/firebase";

export const initialContextValue={
    isInitialized:false,
    app: { name: '' } as FirebaseApp
}

const FirebaseContext=createContext<FirebaseContextType>(initialContextValue);

export default FirebaseContext;