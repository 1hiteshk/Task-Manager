
"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import api from '@/utils/api';
import ProjectCard from '@/components/cards/ProjectCard';
import TaskList from '@/components/TaskLists';
import ProjectModal from '@/components/ProjectModal';
import { fetchProjects } from '@/redux/projects/projectsSlice';
import { RootState, AppDispatch } from '@/redux/store'; 
import { fetchUserInfo } from '@/redux/user/userInfoSlice';
import { isEmpty, isUserLoggedIn } from '@/utils/helpers'
import { useRouter } from 'next/navigation';
import { API_STATUS } from '@/config/constantMaps';

interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

const Home =()=> {
 // const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const [isEditProject, setIsEditProject] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userProject = useSelector( (state: RootState) => state.projects.projects );
  // Access user details from Redux store
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();
  const router = useRouter();
  
  /* const {
    status,
    projects: userProjects,
    error
  } = useSelector( (state: RootState) => state.projects ); */
   const userProjects = useSelector((state:RootState)=> state.projects.projects)
   const status = useSelector((state:RootState)=> state.projects.status)
   const error = useSelector((state:RootState)=> state.projects.error)

   // Fetch user details if not already in the store
 useEffect(() => {
  if (!userDetails.username) {
    dispatch(fetchUserInfo());
  }
}, [ userDetails]);

useEffect(() => {
  // If user is not logged in then redirect to login screen
  if (!isUserLoggedIn()) {
    router.push('/auth');
  }
}, []);

console.log(userProjects[1]?._id, "userProjects");


  useEffect(() => {
    if (userProject.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, userProject.length]);
  
 /*  useEffect(() => {
    if (isEmpty(userProjects)) {
      dispatch(fetchProjects());
    }
  }, []); */


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + userProjects.length) % userProjects.length
    );
  };

  const handleSave = () => {
    dispatch(fetchProjects());
    setRefreshTasks(!refreshTasks);
    onClose();
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    onOpen();
  };

  const handleEditProject = () => {
    setIsEditProject(true);
    setSelectedProject(selectedProject);
    onOpen();
  };

  const selectedProjectFromIndex = userProject[currentIndex];

  const getMainContentUI = () => {
    if (status === API_STATUS.LOADING) {
      return <div>Loading...</div>;
    }
  
    if(error) {
      // Error while fetching the projects
      return <div>Show error state</div>;
    }
  
    if (isEmpty(userProjects)) {
      // Here create the empty state for no projects found
      return (
        <Stack>
            <Heading>No projects found</Heading>
            <Button onClick={handleAddProject}>Create a new project</Button>
          </Stack>
      )
    }

    return (
      <>
        <Flex justify="center" align="center" mt={4}>
        <Flex alignItems={"center"}>
            <Button onClick={handlePrev}>&lt;</Button>
            <Box mx={4}>
              {selectedProjectFromIndex && (
              
                  <ProjectCard key={selectedProjectFromIndex?._id} data={selectedProjectFromIndex} />
               
              )}
            </Box>
            <Button onClick={handleNext}>&gt;</Button>
          </Flex>
      </Flex>
      <Button onClick={handleAddProject} mt={4}>
        Add Project
      </Button>
        <Button onClick={handleEditProject} mt={4}>Edit Project</Button> 
      <Heading as="h2" mt={8} display={"flex"} justifyContent={"center"}>
        {selectedProjectFromIndex
          ? `Tasks of ${selectedProjectFromIndex?.projectTitle}`
          :` No Tasks are there for any Project`}
      </Heading>
      {selectedProjectFromIndex?._id && (
        <TaskList
          projectId={selectedProjectFromIndex._id}
          selectedDate={currentDate}
          refreshTasks={refreshTasks}
        />
      )}
      </>
    )
  }

  return (
    <Box bgColor={'#f2f5ff'} p={'20px 40px'}>
      <Heading color={'#2E3A59'} as="h1">Hello, {userDetails?.username}!</Heading>
      <Text>Have a nice day</Text>
      {getMainContentUI()}
      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={selectedProject?._id}
        initialData={
          selectedProject && isEditProject
            ? {
                projectTitle: selectedProject.projectTitle,
                projectNumber: selectedProject.projectNumber,
              }
            : undefined
        }
        onSave={handleSave}
      />
    </Box>
  );
}

export default Home;