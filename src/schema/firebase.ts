import { FirebaseApp } from "firebase/app";

export type FirebaseContextType = {
  isInitialized: boolean;
  app: FirebaseApp;
};