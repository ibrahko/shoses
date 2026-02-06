'use client';
import React, {useMemo} from 'react';
import {initializeApp, getApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

import {firebaseConfig} from './config';
import {FirebaseProvider} from './provider';

// This is a client-side only provider that will initialize firebase on the client.
// It's recommended to have this at the root of your layout.
export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const {app, auth, firestore} = useMemo(() => {
    // Basic check for the presence of an API key
    if (!firebaseConfig?.apiKey) {
      console.error("Firebase configuration is missing or invalid.");
      return {app: null, auth: null, firestore: null};
    }
    try {
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      return {app, auth, firestore};
    } catch (e) {
      console.error("Firebase initialization failed:", e);
      return {app: null, auth: null, firestore: null};
    }
  }, []);

  if (!app) {
    return (
      <div className="flex h-screen items-center justify-center p-4 text-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 w-full max-w-md">
          <h1 className="text-xl font-bold text-destructive">Firebase Configuration Error</h1>
          <p className="text-muted-foreground mt-2">
            Could not connect to Firebase because the configuration is missing or invalid.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            This might be a temporary issue. I am attempting to resolve it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
