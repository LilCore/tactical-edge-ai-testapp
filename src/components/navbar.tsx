'use client';

import {
  removeItemFromLocalStorage,
  LOCALSTORAGE_OBJECTS_NAMES,
} from '@/functions/localStorage';
import { ROUTES } from '@/types/routesTypes';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { MdOutlineLogout } from 'react-icons/md';

export default function Navbar() {
  const router = useRouter();

  const logout = useCallback(() => {
    removeItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN);
    removeItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);

    // Remove cookie
    document.cookie = `${LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    router.push(ROUTES.LOGIN);
  }, [router]);

  return (
    <HStack height={8} background="transparent" justifyContent="end" mb={8}>
      <HStack cursor="pointer" onClick={logout}>
        <Text>Logout</Text> <MdOutlineLogout size={24} />{' '}
      </HStack>
    </HStack>
  );
}
