// components/TaskFilterButtons.tsx
import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

type TaskFilterButtonsProps = {
  selectedFilter: 'all' | 'not completed' | 'completed';
  onFilterChange: (filter: 'all' | 'not completed' | 'completed') => void;
};

const TaskFilterButtons: React.FC<TaskFilterButtonsProps> = ({ selectedFilter, onFilterChange }) => {
  const buttons = [
    { label: 'All Tasks', value: 'all' },
    { label: 'In-progress', value: 'not completed' },
    { label: 'Completed', value: 'completed' }
  ];

  return (
    <ButtonGroup isAttached variant="outline" mb={4} justifyContent={'center'}>
      {buttons.map(button => (
        <Button
          key={button.value}
          onClick={() => onFilterChange(button.value as any)}
          bg={selectedFilter === button.value ? 'white' : 'gray.100'}
          color={selectedFilter === button.value ? 'black' : 'gray.500'}
          borderRadius="full"
          mx={1}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TaskFilterButtons;
