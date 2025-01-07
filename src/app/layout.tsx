import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@/components/ui/provider';
import { montserratFont } from '../config/fonts';
import { Box, Stack } from '@chakra-ui/react';
import { BACKGROUND_COLOR } from '../config/constants';
import NavbarGuard from '@/components/navbarGuard';
import Navbar from '@/components/navbar';
import ClientSideEffect from '@/components/client-side-effect';

export const metadata: Metadata = {
  title: 'Tactical Edge AI Test',
  description: 'Tactical Edge AI Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserratFont.className}`}>
        <ClientSideEffect />
        <ChakraProvider>
          <ToastContainer />
          <Stack
            id="layout-box"
            width="100%"
            minH="100dvh"
            background={BACKGROUND_COLOR}
            p={{ base: 4, md: 16 }}
            gap={0}
          >
            <NavbarGuard Component={Navbar} />
            <Box
              width="100%"
              height="calc(100% - 32px)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              background={BACKGROUND_COLOR}
            >
              {children}
            </Box>
          </Stack>
        </ChakraProvider>
      </body>
    </html>
  );
}
