// components/Calendar.tsx
import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import TaskList from './TaskLists';

interface CalendarProps {
  projectId: string;
  refreshTasks?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ projectId, refreshTasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      days.push(
        <Box
          key={i}
          textAlign="center"
          cursor="pointer"
          padding="4"
          bg={isSameDay(day, selectedDate) ? 'blue.500' : ''}
          color={isSameDay(day, selectedDate) ? 'white' : 'black'}
          onClick={() => handleDateClick(day)}
        >
          <Text fontSize="sm">{format(day, 'EE')}</Text>
          <Text>{format(day, 'd')}</Text>
        </Box>
      );
    }
    return days;
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="4">
      <Heading size="md">{format(currentDate, 'dd MMMM, yyyy')}</Heading>
        <Button colorScheme="purple">+ Add Task</Button>
      </Flex>
      <Flex justifyContent="space-between">
        {renderWeekDays()}
      </Flex>
      <TaskList projectId={projectId} selectedDate={selectedDate} refreshTasks={refreshTasks} />
    </Box>
  );
};

export default Calendar;