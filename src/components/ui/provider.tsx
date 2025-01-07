'use client';

import { ChakraProvider as Provider } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { system } from '@/config/theme';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <Provider value={system}>
      <ColorModeProvider {...props} />
    </Provider>
  );
}
