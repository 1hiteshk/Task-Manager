import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calendar from '@/components/Calendar';
import { ChakraProvider } from '@chakra-ui/react';

describe('Calendar Component', () => {
  const projectId = 'test-project';

  const renderComponent = () =>
    render(
      <ChakraProvider>
        <Calendar projectId={projectId} />
      </ChakraProvider>
    );

  test('renders calendar with the correct date', () => {
    renderComponent();
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(currentDate);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test('renders week days', () => {
    renderComponent();
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    weekDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('opens and closes TaskModal on button click', () => {
    renderComponent();
    const addButton = screen.getByText('+ Add Task');
    fireEvent.click(addButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('changes selected date on day click', () => {
    renderComponent();
    const dayButton = screen.getByText('Mon');
    fireEvent.click(dayButton);
    expect(dayButton).toHaveStyle('background-color: blue.500');
    expect(dayButton).toHaveStyle('color: white');
  });
});
