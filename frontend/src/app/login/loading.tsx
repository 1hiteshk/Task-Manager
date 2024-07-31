'use client'
import React from 'react';
import { Box, Skeleton, SkeletonCircle, useBreakpointValue } from '@chakra-ui/react';
import type { Metadata } from 'next';

const Loading = () => {
  const skeletonHeight = useBreakpointValue({ base: '200px', md: '400px' });
  const skeletonWidth = '100%';

  return (
    <Box padding="6" boxShadow="lg" bg="white" width={skeletonWidth}>
      <Skeleton height="50px" mb="4" width="50%" />
      <SkeletonCircle size="50" mb="4" />
      <Skeleton height={skeletonHeight} mb="4" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
      <Skeleton height="20px" mb="2" />
    </Box>
  );
};

export default Loading;

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};