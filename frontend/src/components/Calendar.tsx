// components/Calendar.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import TaskList from "./task/TaskLists";
import TaskModal from "./task/TaskModal";

interface CalendarProps {
  projectId: string;
  refreshTasks?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ projectId, refreshTasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSave = () => {
    // setRefreshTasks(prev => !prev); // Toggle refreshTasks state
    onClose();
  };
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
          padding={{ base: 2, md: 4 }}
          height={{ base: "55px", sm: "60px", md: "90px" }}
          width={{ base: "50px", sm: "60px", md: "90px" }}
          bg={isSameDay(day, selectedDate) ? "blue.500" : ""}
          color={isSameDay(day, selectedDate) ? "white" : "black"}
          onClick={() => handleDateClick(day)}
        >
          <Text fontSize="sm">{format(day, "EE")}</Text>
          <Text>{format(day, "d")}</Text>
        </Box>
      );
    }
    return days;
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading size="md">{format(currentDate, "dd MMMM, yyyy")}</Heading>
        <Button colorScheme="purple" onClick={onOpen}>
          + Add Task
        </Button>
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          projectId={projectId}
          onSave={handleSave}
        />
      </Flex>
      <Flex justifyContent="space-between">{renderWeekDays()}</Flex>
      <TaskList
        projectId={projectId}
        selectedDate={selectedDate}
        refreshTasks={refreshTasks}
      />
    </Box>
  );
};

export default Calendar;
