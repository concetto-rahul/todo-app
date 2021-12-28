import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const emulatorConfig = {
  auth: { url: 'http://localhost:9099' },
  firestore: { host: 'localhost', port: 8080 },
  storage: { host: 'localhost', port: 9199 },
  functions: { host: 'localhost', port: 5001 }
};

const connectToEmulator = (app: FirebaseApp) => ({
  auth: () => {
    connectAuthEmulator(getAuth(app), emulatorConfig.auth.url);
  },
  firestore: () => {
    connectFirestoreEmulator(
      getFirestore(app),
      emulatorConfig.firestore.host,
      emulatorConfig.firestore.port
    );
  },
  storage: () => {
    connectStorageEmulator(
      getStorage(app),
      emulatorConfig.storage.host,
      emulatorConfig.storage.port
    );
  },
  functions: () => {
    connectFunctionsEmulator(
      getFunctions(app),
      emulatorConfig.functions.host,
      emulatorConfig.functions.port
    );
  }
});

export default connectToEmulator;
