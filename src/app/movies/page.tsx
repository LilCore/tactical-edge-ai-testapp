'use client';

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import MovieCard from '@/components/movie-card';
import { Movie } from '@/types/moviesTypes';
import CustomButton from '@/components/custom-button';
import { ROUTES } from '@/types/routesTypes';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination';
import { LuCirclePlus } from 'react-icons/lu';
import Link from 'next/link';
import useStore from '@/config/zustantStore';
import { getUserMovies } from '@/services/api';
import PageSpinner, { CENTER_STYLES } from '@/components/page-spinner';

const PAGE_SIZE = 8;

export default function Movies() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [moviesRetrieved, setMoviesRetrieved] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [page, setPage] = useState(1);
  const startRange = useMemo(() => (page - 1) * PAGE_SIZE, [page]);
  const endRange = useMemo(() => startRange + PAGE_SIZE, [startRange]);
  const visibleMovies = useMemo(
    () => movies.slice(startRange, endRange),
    [movies, startRange, endRange],
  );

  useEffect(() => {
    if (!moviesRetrieved && user) {
      getUserMovies({ userId: user._id }).then((response) => {
        if (response.success) {
          setMoviesRetrieved(true);
          const movs = response.data;
          //   setMovies(movs);
          // To test the pagination
          setMovies(Array(67).fill(movs).flat());
        }
      });
    }
  }, [moviesRetrieved, user]);

  return (
    <Container position="relative">
      {!moviesRetrieved ? (
        <PageSpinner />
      ) : movies.length ? (
        <Stack gap={16}>
          <HStack alignItems="center">
            <Heading fontSize={48} fontWeight={600} mb={2}>
              My Movies
            </Heading>

            <Link href={ROUTES.CREATE_MOVIE}>
              <LuCirclePlus size={26} fontWeight={700} />
            </Link>
          </HStack>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            justifyItems={{ base: 'center', md: 'start' }}
            gap={4}
          >
            {visibleMovies.map((movie) => (
              <GridItem
                key={movie.title}
                onClick={() =>
                  router.push(`${ROUTES.UPDATE_MOVIE}/${movie._id}`)
                }
              >
                <MovieCard movie={movie} />
              </GridItem>
            ))}
          </Grid>

          <HStack justifyContent="center">
            <Pagination
              page={page}
              count={movies.length}
              pageSize={PAGE_SIZE}
              setPage={setPage}
            />
          </HStack>
        </Stack>
      ) : (
        <Stack
          textAlign="center"
          gap={8}
          id="sakura"
          style={{ ...CENTER_STYLES, width: 'inherit' }}
        >
          <Heading size={{ base: '6xl' }}>Your movie list is empty</Heading>
          <Box>
            <CustomButton
              label="Add a new movie"
              onClick={() => router.push(ROUTES.CREATE_MOVIE)}
            />
          </Box>
        </Stack>
      )}
    </Container>
  );
}
