'use client';
import type {FirebaseApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';
import React, {createContext, useContext} from 'react';

// Define the context shape
interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

// Create the context with a default value
const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  firestore: null,
});

export function FirebaseProvider({
  children,
  app,
  auth,
  firestore,
}: {
  children: React.ReactNode;
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}) {
  return (
    <FirebaseContext.Provider value={{app, auth, firestore}}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Custom hooks to use the Firebase context
export const useFirebaseApp = () => useContext(FirebaseContext)?.app;
export const useAuth = () => useContext(FirebaseContext)?.auth;
export const useFirestore = () => useContext(FirebaseContext)?.firestore;
