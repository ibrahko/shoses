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
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return {app, auth, firestore};
  }, []);

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
