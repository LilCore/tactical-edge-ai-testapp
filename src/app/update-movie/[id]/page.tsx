'use client';

import { Container, HStack, Heading, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ROUTES } from '@/types/routesTypes';
import { useParams, useRouter } from 'next/navigation';
import { storeFile } from '@/functions/functions';
import useStore from '@/config/zustantStore';
import { showErrorToast } from '@/components/toast';
import { createMovie, getMovie, updateMovie } from '@/services/api';
import UpdateMovie from '@/components/update-movies';
import { Movie } from '@/types/moviesTypes';
import PageSpinner from '@/components/page-spinner';

export default function UpdateMoviePage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [movieRetrieved, setMovieRetrieved] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const params = useParams<{ id: string }>();
  //   console.log({ params });

  const [movie, setMovie] = useState<Movie | null>();
  const [id, setId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState<number | null>(null);
  const [poster, setPoster] = useState('');

  useEffect(() => {
    if (!movieRetrieved) {
      getMovie({ id: params.id }).then((response) => {
        if (response.success) {
          setMovieRetrieved(true);
          const mov = response.data as Movie;
          setMovie(mov);
          setId(mov._id);
          setTitle(mov.title);
          setPublishingYear(mov.publishingYear);
          setImagePreview(mov.poster);
          setPoster(mov.poster);
        }
      });
    }
  }, [id, movieRetrieved, params.id, publishingYear, title, user?._id]);

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

  const update = useCallback(async () => {
    setLoading(true);
    if (user) {
      try {
        let url = poster;
        if (imageFile) {
          const movieImageResponse = await storeFile(
            imageFile,
            imageFileName,
            user,
          );
          url = movieImageResponse?.data ?? '';
        }
        const result = await updateMovie({
          id,
          title,
          publishingYear: publishingYear ?? 0,
          poster: url,
          userId: user._id,
        });

        if (result.success) {
          redirectToMovies();
        } else throw new Error(result.message);
      } catch (error) {
        showErrorToast((error as any).message);
      }
    }
    setLoading(false);
  }, [
    id,
    imageFile,
    imageFileName,
    poster,
    publishingYear,
    redirectToMovies,
    title,
    user,
  ]);

  const userIsCreator = useMemo(
    () => user?._id === movie?.userId,
    [movie?.userId, user?._id],
  );

  return (
    <Container>
      {!movieRetrieved ? (
        <PageSpinner />
      ) : (
        <Stack gap="16">
          <Heading size={{ base: '2xl', md: '6xl' }}>
            {userIsCreator ? 'Update Movie' : 'Movie details'}
          </Heading>

          <HStack gap={24} alignItems="start">
            <UpdateMovie
              canUpdate={userIsCreator}
              title={title}
              setTitle={setTitle}
              publishingYear={publishingYear}
              setPublishingYear={setPublishingYear}
              imagePreview={imagePreview}
              onDrop={onDrop}
              removeFile={removeFile}
              create={update}
              loading={loading}
              redirectToMovies={redirectToMovies}
              imageFile={null}
              label="Update"
            />
          </HStack>
        </Stack>
      )}
    </Container>
  );
}
