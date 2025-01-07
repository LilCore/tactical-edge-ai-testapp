import React from 'react';
import { Spinner } from '@chakra-ui/react';

export const CENTER_STYLES: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
};

const PageSpinner = () => {
  return <Spinner style={CENTER_STYLES} size="lg" />;
};

export default PageSpinner;
