"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import api from '@/utils/api';
import ProjectCard from '@/components/cards/ProjectCard';
import TaskList from '@/components/TaskLists';
import ProjectModal from '@/components/ProjectModal';
import { fetchProjects } from '@/redux/projects/projectsSlice';
import { RootState, AppDispatch } from '@/app/store'; 
import { fetchUserInfo } from '@/redux/user/userInfoSlice';

interface Project {
  _id: string;
  projectNumber: string;
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
  const userProjects = useSelector( (state: RootState) => state.projects.projects );
  // Access user details from Redux store
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();

  

 // Fetch user details if not already in the store
 useEffect(() => {
  if (!userDetails.username) {
    dispatch(fetchUserInfo());
  }
}, [dispatch, userDetails]);
 
  console.log(userProjects[1]?._id, "userProjects");

  useEffect(() => {
    if (userProjects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, userProjects.length]);

 

  /* const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      console.log(res);
      setProjects(res.data);
      dispatch(setUserProjects(res.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }; */

 /*  useEffect(() => {
    fetchProjects();
  }, [dispatch]); */

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

  const selectedProjectFromIndex = userProjects[currentIndex];

  return (
    <div>
      <Heading as="h1">Hello, {userDetails?.username}</Heading>
      <Flex justify="center" align="center" mt={4}>
        {userProjects.length === 0 ? (
          <Stack>
            <Heading>No projects found</Heading>
            <Button onClick={handleAddProject}>Create a new project</Button>
          </Stack>
        ) : (
          <Flex alignItems={"center"}>
            <Button onClick={handlePrev}>&lt;</Button>
            <Box mx={4}>
              {selectedProjectFromIndex && (
              
                  <ProjectCard key={selectedProjectFromIndex?._id} data={selectedProjectFromIndex} />
               
              )}
            </Box>
            <Button onClick={handleNext}>&gt;</Button>
          </Flex>
        )}
      </Flex>
      <Button onClick={handleAddProject} mt={4}>
        Add Project
      </Button>
      {/*  <Button onClick={handleEditProject} mt={4}>Edit Project</Button> */}
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
      <Heading as="h2" mt={8} display={"flex"} justifyContent={"center"}>
        {selectedProjectFromIndex
          ? `Tasks of ${selectedProjectFromIndex?.projectTitle}`
          : `No Tasks are there for any Project`}
      </Heading>
      {selectedProjectFromIndex?._id && (
        <TaskList
          projectId={selectedProjectFromIndex._id}
          selectedDate={currentDate}
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
}

export default Home;
