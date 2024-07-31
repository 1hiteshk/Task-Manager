'use client'
import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import React from 'react'

const loading = () => {
    const skeletonHeight = useBreakpointValue({ base: '200px', md: '400px' });
    const skeletonWidth = '100%';
  
    return (
      <Box padding="6" boxShadow="lg" bg="white" width={skeletonWidth}>
        <Skeleton height="50px" mb="4" width="50%" />
        <Skeleton height={skeletonHeight} mb="4" />
        <Skeleton height="20px" mb="2" />
        <Skeleton height="20px" mb="2" />
        <Skeleton height="20px" mb="2" />
      </Box>
    );
  };

export default loading;