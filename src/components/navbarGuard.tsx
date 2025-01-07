'use client';

import { ROUTES } from '@/types/routesTypes';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const ROUTES_WITHOUT_NAVBAR = [ROUTES.LOGIN, ROUTES.SIGNUP];

export default function NavbarGuard({ Component }: { Component: React.FC }) {
  const pathName = usePathname();

  if (ROUTES_WITHOUT_NAVBAR.includes(pathName.toLocaleLowerCase() as ROUTES))
    return null;
  return <Component />;
}
