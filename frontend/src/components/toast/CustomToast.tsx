'use client'
import React, { useEffect, useState } from 'react';
import { Box, Progress, UseToastOptions, CloseButton } from '@chakra-ui/react';

interface CustomToastProps extends UseToastOptions {
  duration: number;
  title: string;
  description: string;
  status: 'error' | 'success' | 'warning' | 'info';
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ duration, title, description, status, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 50; // Update progress every 50ms
    const decrement = (interval / duration) * 100; // Calculate decrement based on duration

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [duration, onClose]);

  const bgColor = status === 'error' ? 'red.200' : 'green.200'; // Light red for error and light green for success

  return (
    <Box bg={bgColor} p={3} borderRadius="md" position="relative">
      <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
      <Box fontWeight="bold" mb={2}>{title}</Box>
      <Box>{description}</Box>
      <Progress
        value={progress}
        size="xs"
        mt={2}
        colorScheme={status === 'error' ? 'red' : status === 'success' ? 'green' : status === 'warning' ? 'yellow' : 'blue'}
        style={{ direction: 'rtl', transition: 'width 0.05s linear' }}
      />
    </Box>
  );
};

export default CustomToast;
