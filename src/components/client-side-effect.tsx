'use client';

import useStore from '@/config/zustantStore';
import {
  getItemFromLocalStorage,
  LOCALSTORAGE_OBJECTS_NAMES,
} from '@/functions/localStorage';
import { useEffect } from 'react';

const ClientSideEffect = () => {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const user = getItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);
    console.log('GETTING USER FROM LOCALSTORAGE', user);
    if (user) setUser(user);
  }, [setUser]);

  return null;
};

export default ClientSideEffect;
