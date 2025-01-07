import { createSystem, defineConfig, defaultSystem } from '@chakra-ui/react';
import { PRIMARY_COLOR, ERROR_COLOR } from './constants';

const defaultSystemConfig = defaultSystem._config;
// console.log(defaultSystemConfig);

const config = defineConfig({
  ...defaultSystemConfig,
  theme: {
    ...defaultSystemConfig.theme,
    tokens: {
      ...defaultSystemConfig?.theme?.tokens,
      colors: {
        ...defaultSystemConfig.theme?.tokens?.colors,
        primary: { value: PRIMARY_COLOR },
        error: { value: ERROR_COLOR },
      },
    },
  },
});

export const system = createSystem(config);
