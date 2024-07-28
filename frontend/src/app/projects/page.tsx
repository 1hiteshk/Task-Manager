"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import ProjectCard from "@/components/cards/ProjectCard";
import userProfile from "@/hooks/userProfile";
import { useDispatch, useSelector } from "react-redux";
import { setUserProjects } from "@/redux/projects/projectsSlice";
import { RootState } from "../store";
import TaskList from "@/components/TaskLists";
import Link from "next/link";
import { Box, Button, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import ProjectModal from "@/components/ProjectModal";

interface Project {
  _id: string;
  projectNumber: string;
  projectTitle: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const userDetails = userProfile(); // Get the user profile using the custom hook
  const dispatch = useDispatch();
  const userProjects = useSelector((state: RootState) => state.projects.projects);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(userProjects[1]?._id,"userProjects")

  const fetchProjects = async () => {

    try {
      const res = await api.get("/projects");
      console.log(res);
      setProjects(res.data);
      dispatch(setUserProjects(res.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, [dispatch]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleSave = () => {
    fetchProjects();
    onClose();
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    onOpen();
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  const selectedProjectFromIndex = projects[currentIndex];

  return (
    <div>
       <Heading as="h1">Hello, {userDetails?.username}</Heading>
       <Flex justify="center" align="center" mt={4}>
        { projects.length==0 ? <Stack>
          <Heading>No projects found</Heading>
          <Button onClick={handleAddProject}>Create a new project</Button>
        </Stack> :
          <Flex alignItems={'center'}>
            <Button onClick={handlePrev}>&lt;</Button>
        <Box mx={4}>
          {selectedProjectFromIndex && 
           <Link href={`/projects/${selectedProjectFromIndex?._id}`} key={selectedProjectFromIndex?._id}>
          <ProjectCard  data={selectedProjectFromIndex} />
          </Link>
          }
        </Box>
        <Button onClick={handleNext}>&gt;</Button>
          </Flex>
        }
      </Flex>
      <Button onClick={handleAddProject} mt={4}>Add Project</Button>
      <ProjectModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={selectedProject?._id}
        initialData={selectedProject ? {
          projectTitle: selectedProject.projectTitle,
          projectNumber: selectedProject.projectNumber
        } : undefined}
        onSave={handleSave}
      />
      <Heading as="h2" mt={8} display={'flex'} justifyContent={'center'}>
       { selectedProjectFromIndex ? `Tasks of ${selectedProjectFromIndex?.projectTitle}` :
       `No Tasks are there for any Project` }
      </Heading>
      {selectedProjectFromIndex?._id && <TaskList projectId={selectedProjectFromIndex._id}  />}
     
    </div>
  );
}
