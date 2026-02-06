'use client';

import {useEffect, useState} from 'react';
import type {User} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';
import {useAuth} from '../';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [auth]);

  return {user, loading};
}
