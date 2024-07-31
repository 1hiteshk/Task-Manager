'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ProjectCard from '@/components/cards/ProjectCard';
import TaskList from '@/components/task/TaskLists';
import ProjectModal from '@/components/project/ProjectModal';
import { fetchProjects } from '@/redux/projects/projectsSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchUserInfo } from '@/redux/user/userInfoSlice';
import { isEmpty, isUserLoggedIn } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { API_STATUS } from '@/config/constantMaps';

interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const [isEditProject, setIsEditProject] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userProjects = useSelector((state: RootState) => state.projects.projects);
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();
  const router = useRouter();

  const { status, error } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    const initialize = async () => {
      setIsMounted(true);
      if (!isUserLoggedIn()) {
        router.push('/login');
        return;
      }
      if (!userDetails.username) {
        await dispatch(fetchUserInfo());
      }
      if (userProjects.length === 0) {
        await dispatch(fetchProjects());
      }
    };

    initialize();
  }, [dispatch, router, userDetails.username, userProjects.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + userProjects.length) % userProjects.length);
  };

  const handleSave = () => {
    dispatch(fetchProjects());
    setRefreshTasks(!refreshTasks);
    onClose();
  };

  const handleAddProject = () => {
    setIsEditProject(false);
    setSelectedProject(null);
    onOpen();
  };

  const handleEditProject = () => {
    setIsEditProject(true);
    setSelectedProject(selectedProject);
    onOpen();
  };

  const selectedProjectFromIndex = userProjects[currentIndex];

  const getMainContentUI = () => {
    if (status === API_STATUS.LOADING) {
      return <Flex p={4}>Loading...</Flex>;
    }

    if (error) {
      return <Flex p={4}>Show error state</Flex>;
    }

    if (isEmpty(userProjects)) {
      return (
        <Stack p={4} gap={4} height="100vh">
          <Heading>No projects found</Heading>
          <Button colorScheme="blue" onClick={handleAddProject}>
            Create a new project
          </Button>
        </Stack>
      );
    }

    return (
      <>
        <Flex justify="center" align="center" mt={4}>
          <Flex alignItems="center" minWidth={'330px'}>
            <Button onClick={handlePrev}>&lt;</Button>
            <Box mx={{base:1,sm:3,md:4}}>
              {selectedProjectFromIndex && (
                <ProjectCard key={selectedProjectFromIndex._id} data={selectedProjectFromIndex} />
              )}
            </Box>
            <Button onClick={handleNext}>&gt;</Button>
          </Flex>
        </Flex>
        <Flex justifyContent="space-around" alignItems="center">
          <Button bgColor="#4841e5" color="#fff" onClick={handleAddProject} mt={4}>
            Add Project
          </Button>
          <Button bgColor="#4d44f8" color="#fff" onClick={handleEditProject} mt={4}>
            Edit Project
          </Button>
        </Flex>
        <Heading as="h2" my={8} display="flex" justifyContent="center">
          {selectedProjectFromIndex
            ? `Tasks of ${selectedProjectFromIndex.projectTitle}`
            : 'No Tasks are there for any Project'}
        </Heading>
        {selectedProjectFromIndex?._id && (
          <TaskList
            projectId={selectedProjectFromIndex._id}
            selectedDate={currentDate}
            refreshTasks={refreshTasks}
          />
        )}
      </>
    );
  };

  if (!isMounted) return null;

  return (
    <Box bgColor="#f2f5ff" p={{ base: '20px', md: '20px 40px' }}>
      <Heading color="#2E3A59" as="h1">
        Hello, {userDetails?.username}!
      </Heading>
      <Text>Have a nice day</Text>
      {getMainContentUI()}
      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={isEditProject ? selectedProjectFromIndex?._id : ''}
        initialData={
          selectedProjectFromIndex && isEditProject
            ? {
                projectTitle: selectedProjectFromIndex.projectTitle,
                projectNumber: selectedProjectFromIndex.projectNumber,
              }
            : undefined
        }
        onSave={handleSave}
      />
    </Box>
  );
};

export default Home;
