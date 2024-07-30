
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/utils/api';
import TaskList from '@/components/TaskLists';
import { Box, Button, Flex, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import TaskModal from '@/components/TaskModal';
import UpdatedTaskList from '@/components/UpdatedTaskList';
import Calendar from '@/components/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { isEmpty, isUserLoggedIn } from '@/utils/helpers';
import { fetchProjectDetails } from '@/redux/projects/projectDetailsSlice';
import { API_STATUS } from '@/config/constantMaps';
import { removeUserProject } from '@/redux/projects/projectsSlice';
import CustomToast from '@/components/toast/CustomToast';
import  { ProjectCardDetails } from '@/components/cards/ProjectDetailsCard';
import ProjectModal from '@/components/ProjectModal';
import { deleteTasksByProjectId } from '@/redux/tasks/tasksSlice';

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
  const router = useRouter();
  const id = params?.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Replace 'any[]' with the actual task interface
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch<AppDispatch>();
  const {
    status,
    projectDetailsMap,
    error
  } = useSelector( (state: RootState) => state.projectDetails );

  const projectDetails = projectDetailsMap?.[id];

  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${projectDetails?._id}`); // Make API call to delete project
      dispatch(removeUserProject(String(projectDetails?._id))); // Dispatch action to update the Redux state
      dispatch(deleteTasksByProjectId(String(projectDetails?._id)));
      toast({
        duration: 5000,
        position: 'bottom-right',
        isClosable: true,
        render: ({onClose}) => (
          <CustomToast
            duration={5000}
            title={`Project ${projectDetails?.projectNumber} deleted.`}
            description={`The project ${projectDetails?.projectTitle} and its associated tasks have been deleted.`}
            status="success"
            onClose={onClose}
          />
        ),
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        render: ({ onClose }) => (
          <CustomToast
            duration={5000}
            title={`Error deleting project ${projectDetails?.projectNumber}.`}
            description="There was an error deleting the project."
            status="error"
            onClose={onClose}
          />
        ),
      });
    }
    router.push(`/projects`);
  };


  useEffect(() => {
    // If user is not logged in then redirect to login screen
    if (!isUserLoggedIn()) {
      router.push('/auth');
    }
  }, []);

  // Will try to fetch project details if not already found in redux store
  useEffect(() => {
    if (isEmpty(projectDetails) && id) {
      dispatch(fetchProjectDetails(id));
    }
  }, [id]);


  const handleSave = () => {
    setRefreshTasks(prev => !prev); // Toggle refreshTasks state
    onClose();
  };

  if (status === API_STATUS.LOADING) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Show error state</div>;
  }

  if (isEmpty(projectDetails)) {
    return <div>Project not found</div>;
  }

  const {
    projectTitle, projectNumber, createdAt, updatedAt, _id
  } = projectDetails ?? {};

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mb={4} bg="white" boxShadow="lg">
      <Flex justifyContent={'space-between'}>
      <ProjectCardDetails project={projectDetails}/>
      <Stack gap={2} >
     <Button colorScheme='blue' onClick={onOpen}>Edit Projects</Button>
     <Button colorScheme="purple" onClick={handleDelete}>Delete Project</Button>
     </Stack>

      </Flex>
      

     {/*  <Button onClick={onOpen}>Add Task</Button> */}
      <Calendar projectId={_id} refreshTasks={refreshTasks} />

      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={_id}
        initialData={
          projectDetails
            ? {
                projectTitle: projectTitle,
                projectNumber: projectNumber,
              }
            : undefined
        }
        onSave={handleSave}
      />

     {/*  {project._id && <UpdatedTaskList tasks={tasks} />} */}
    {/*   {project._id && <TaskList projectId={project._id} refreshTasks={refreshTasks}/>} */}
    </Box>
  );
};

export default ProjectDetails;