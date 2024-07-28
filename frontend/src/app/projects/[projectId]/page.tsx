'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/api';
import TaskList from '@/components/TaskLists';
import { Button, useDisclosure } from '@chakra-ui/react';
import TaskModal from '@/components/TaskModal';
import UpdatedTaskList from '@/components/UpdatedTaskList';
import Calendar from '@/components/Calendar';

// Define the project interface
interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const ProjectDetails = () => {
  const params = useParams();
  const id = params?.projectId;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Replace 'any[]' with the actual task interface
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
       
        try {
          const res = await api.get(`/projects/${id}`);
          console.log(res.data);
          setProject(res.data);
        } catch (error) {
          console.error('Error fetching project details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id]);


  const handleSave = () => {
    setRefreshTasks(prev => !prev); // Toggle refreshTasks state
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found or an error occurred.</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <p><strong>Project Title:</strong> {project.projectTitle}</p>
      <p><strong>Project Number:</strong> {project.projectNumber}</p>
      <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(project.updatedAt).toLocaleString()}</p>

      <Button onClick={onOpen}>Add Task</Button>
      <Calendar projectId={project._id} refreshTasks={refreshTasks} />

      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={project?._id}
        onSave={handleSave}
      />

     {/*  {project._id && <UpdatedTaskList tasks={tasks} />} */}
    {/*   {project._id && <TaskList projectId={project._id} refreshTasks={refreshTasks}/>} */}
    </div>
  );
};

export default ProjectDetails;
