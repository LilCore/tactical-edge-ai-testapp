'use client';

import { Container, HStack, Heading, Stack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { ROUTES } from '@/types/routesTypes';
import { useRouter } from 'next/navigation';
import { storeFile } from '@/functions/functions';
import useStore from '@/config/zustantStore';
import { showErrorToast } from '@/components/toast';
import { createMovie } from '@/services/api';
import UpdateMovie from '@/components/update-movies';

export default function CreateMovie() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImageFile(file);
        const fileType = file.name.split('.').pop();
        setImageFileName(`${title}.${fileType}`);
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      }
    },
    [title],
  );

  const removeFile = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const redirectToMovies = useCallback(() => {
    router.push(ROUTES.MOVIES);
  }, [router]);

  const create = useCallback(async () => {
    setLoading(true);
    if (user) {
      try {
        const movieImageResponse = await storeFile(
          imageFile,
          imageFileName,
          user,
        );
        // console.log(movieImageResponse);

        if (movieImageResponse?.success) {
          const poster = movieImageResponse.data;

          const result = await createMovie({
            title,
            publishingYear: publishingYear ?? 0,
            poster,
            userId: user._id,
          });

          if (result.success) {
            redirectToMovies();
          } else throw new Error(result.message);
        } else {
          throw new Error('Error creating movie');
        }
      } catch (error) {
        showErrorToast((error as any).message);
      }
    }
    setLoading(false);
  }, [imageFile, imageFileName, publishingYear, redirectToMovies, title, user]);

  return (
    <Container>
      <Stack gap="16">
        <Heading size={{ base: '2xl', md: '6xl' }}>Create a new movie</Heading>

        <HStack
          gap={24}
          alignItems="start"
          justifyContent={{ base: 'center', md: 'start' }}
        >
          <UpdateMovie
            title={title}
            setTitle={setTitle}
            publishingYear={publishingYear}
            setPublishingYear={setPublishingYear}
            imagePreview={imagePreview}
            onDrop={onDrop}
            removeFile={removeFile}
            create={create}
            loading={loading}
            redirectToMovies={redirectToMovies}
            imageFile={null}
            canUpdate
          />
        </HStack>
      </Stack>
    </Container>
  );
}
