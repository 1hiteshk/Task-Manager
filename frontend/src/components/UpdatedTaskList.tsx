// components/TaskList.tsx

import React from 'react';

// Define the props interface
interface TaskListProps {
  tasks: Task[];
}

// Define the task interface
interface Task {
  _id: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
}

const UpdatedTaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div style={{ border: '2px solid black', padding: '6px', gap: '2px' }} key={task._id}>
          <h1>{task.taskTitle}</h1>
          <h2>{task.taskStatus}</h2>
          <p>{task.taskDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default UpdatedTaskList;
