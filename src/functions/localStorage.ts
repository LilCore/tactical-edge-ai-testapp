import { User } from '@/types/userTypes';

export enum LOCALSTORAGE_OBJECTS_NAMES {
  USER = 'user',
  ACCESS_TOKEN = 'accesstoken',
}

export const getItemFromLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
): any => {
  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};

export const setItemToLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
  content: any,
) => {
  localStorage.setItem(name, JSON.stringify(content));
};

export const removeItemFromLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
) => {
  localStorage.removeItem(name);
};

export const storeUserData = (token: string, user: User) => {
  console.log('SETTING USER TO LOCALSTORAGE', user);
  setItemToLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER, user);
  setItemToLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN, token);
  document.cookie = `${LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN}=${token}; path=/;`;
};
