'use client';

import { HStack, Stack, Text } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';

const Pagination = ({
  page,
  count,
  pageSize,
  setPage,
}: {
  page: number;
  count: number;
  pageSize: number;
  setPage: (page: number) => void;
}) => {
  return (
    <PaginationRoot
      page={page}
      count={count}
      pageSize={pageSize}
      onPageChange={(e) => setPage(e.page)}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
