import { CARD_COLOR } from '@/config/constants';
import { Box, Image } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';

import { useDropzone } from 'react-dropzone';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';

interface DropZoneProps {
  imagePreview: string | null;
  removeFile: () => void;
  onDrop: (acceptedFiles: File[]) => void;
  disabled?: boolean;
}

const DropZone = ({
  imagePreview,
  removeFile,
  onDrop,
  disabled,
}: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  return (
    <Box w={{ base: 'full', md: '473px' }} height="504px" id="sasuke">
      {imagePreview ? (
        <Box position="relative" w="full" h="full" borderRadius="10px">
          {!disabled && (
            <Box
              cursor="pointer"
              position="absolute"
              right={0}
              top={0}
              fontSize={28}
              p={4}
              color={CARD_COLOR}
              onClick={removeFile}
            >
              <IoMdTrash />
            </Box>
          )}
          <Image
            src={imagePreview}
            alt="Preview"
            w="full"
            h="full"
            borderRadius="inherit"
          />
        </Box>
      ) : (
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderRadius="10px"
          borderStyle="dashed"
          borderColor={isDragActive ? 'blue.500' : 'gray.200'}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          cursor="pointer"
          color="white"
          w="full"
          h="full"
          gap={4}
        >
          <input {...getInputProps()} />
          <FiDownload size={20} />
          {isDragActive ? (
            <Text>Drop the image here</Text>
          ) : (
            <Text>Drag & drop an image here</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DropZone;
