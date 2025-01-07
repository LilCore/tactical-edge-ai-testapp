'use client';

import { CARD_COLOR, INPUT_COLOR } from '@/config/constants';
import { Movie } from '@/types/moviesTypes';
import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Image,
  Heading,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react';

// import Image from 'next/image';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card.Root
      overflow="hidden"
      w="282px"
      height="504px"
      background={CARD_COLOR}
      borderRadius="12px"
      padding="8px 8px 16px 8px"
      cursor="pointer"
    >
      <Card.Body>
        <Image
          borderRadius="12px"
          w="full"
          h="400px"
          src={movie.poster}
          alt={movie.title}
        />
      </Card.Body>
      <Card.Footer display="block">
        <Heading fontWeight={500} fontSize={20} mb={2}>
          {movie.title}
        </Heading>
        <Text fontWeight={400} fontSize={14}>
          {movie.publishingYear}
        </Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default MovieCard;
