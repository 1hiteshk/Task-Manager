"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import TaskList from "@/components/TaskLists";
import { Box, Button, Flex, Heading, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import TaskModal from "@/components/TaskModal";
import UpdatedTaskList from "@/components/UpdatedTaskList";
import Calendar from "@/components/Calendar";
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import {
  addUserProject,
  fetchByProjectId,
  fetchProjectById,
  removeUserProject,
} from "@/redux/projects/projectsSlice";
import ProjectModal from "@/components/ProjectModal";
import { deleteTasksByProjectId } from "@/redux/tasks/tasksSlice";
import CustomToast from "@/components/toast/CustomToast";

// Define the project interface
interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  userId: string | any;
  createdAt?: string;
  updatedAt?: string;
}

const ProjectDetails = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Replace 'any[]' with the actual task interface
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const userProjects = useSelector(
    (state: RootState) => state.projects.projects
  );
  // Access user details from Redux store
  const userId = useSelector((state: RootState) => state.userDetails.id);
  
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${project?._id}`); // Make API call to delete project
      dispatch(removeUserProject(String(project?._id))); // Dispatch action to update the Redux state
      dispatch(deleteTasksByProjectId(String(project?._id)));
      toast({
        duration: 5000,
        position: 'bottom-right',
        isClosable: true,
        render: ({onClose}) => (
          <CustomToast
            duration={5000}
            title={`Project ${project?.projectNumber} deleted.`}
            description={`The project ${project?.projectTitle} and its associated tasks have been deleted.`}
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
            title={`Error deleting project ${project?.projectNumber}.`}
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
    const fetchProject = async () => {
      if (projectId) {
        const existingProject = userProjects.find(
          (project) => project._id === projectId
        );
        if (existingProject) {
          setProject(existingProject);
          setLoading(false);
        } else {
          const newProject = await fetchByProjectId(String(projectId));
          setProject(newProject as any);
          const project2 = { newProject, userId };
          dispatch(addUserProject(project2 as any));
          setLoading(false);
        }
      }
    };
    fetchProject();
  }, [projectId,refreshTasks]);

  console.log({ userProjects });

  const handleSave = () => {
    setRefreshTasks((prev) => !prev); // Toggle refreshTasks state
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found or an error occurred.</div>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mb={4} bg="white" boxShadow="lg">
     <Flex alignItems={'center'} justifyContent={'space-between'}>
     <Heading as="h1" size="lg" mb={4}>
      Project Details
    </Heading>
     <Stack gap={2} >
     <Button colorScheme="purple" onClick={onOpen}>Edit Projects</Button>
     <Button colorScheme="red" onClick={handleDelete}>Delete Project</Button>
     </Stack>
     </Flex>
    <Flex direction="column" mb={4}>
      <Text fontWeight="bold">
        Project Title: <Text as="span" fontWeight="normal">{project.projectTitle}</Text>
      </Text>
      <Text fontWeight="bold">
        Project Number: <Text as="span" fontWeight="normal">{project.projectNumber}</Text>
      </Text>
      <Text fontWeight="bold">
        Created At: <Text as="span" fontWeight="normal">{new Date(String(project.createdAt)).toLocaleString()}</Text>
      </Text>
      <Text fontWeight="bold">
        Updated At: <Text as="span" fontWeight="normal">{new Date(String(project.updatedAt)).toLocaleString()}</Text>
      </Text>
    </Flex>

    {/* <Button onClick={onOpen}>Add Task</Button> */}
    <Calendar projectId={project._id} refreshTasks={refreshTasks} />

    <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={project?._id}
        initialData={
          project
            ? {
                projectTitle: project.projectTitle,
                projectNumber: project.projectNumber,
              }
            : undefined
        }
        onSave={handleSave}
      />

    {project._id && <UpdatedTaskList tasks={tasks} />}
    {project._id && <TaskList projectId={project._id} refreshTasks={refreshTasks} />}
  </Box>
  );
};

export default ProjectDetails;
