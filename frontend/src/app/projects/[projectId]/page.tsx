"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Calendar from "@/components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { isEmpty, isUserLoggedIn } from "@/utils/helpers";
import { fetchProjectDetails } from "@/redux/projects/projectDetailsSlice";
import { API_STATUS } from "@/config/constantMaps";
import { ProjectCardDetails } from "@/components/cards/ProjectDetailsCard";
import ProjectModal from "@/components/project/ProjectModal";
import DeleteProjectModal from "@/components/project/DeleteProjectModal";

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
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const dispatch = useDispatch<AppDispatch>();
  const { status, projectDetailsMap, error } = useSelector(
    (state: RootState) => state.projectDetails
  );

  const projectDetails = projectDetailsMap?.[id];

  useEffect(() => {
    // If user is not logged in then redirect to login screen
    if (!isUserLoggedIn()) {
      router.push("/login");
    }
  }, []);

  // Will try to fetch project details if not already found in redux store
  useEffect(() => {
    if (isEmpty(projectDetails) && id) {
      dispatch(fetchProjectDetails(id));
    }
  }, [id]);

  const handleSave = () => {
    setRefreshTasks((prev) => !prev); // Toggle refreshTasks state
    onClose();
  };

  if (status === API_STATUS.LOADING) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Show error state</div>;
  }

  if (isEmpty(projectDetails)) {
    return <div>Project not found</div>;
  }

  const { projectTitle, projectNumber, createdAt, updatedAt, _id } =
    projectDetails ?? {};

  return (
    <Box
      p={6}
      mb={4}
      bg="white"
    >
      <Flex justifyContent={"space-between"}>
        <ProjectCardDetails project={projectDetails} />
        <Stack gap={2}>
          <Button colorScheme="blue" onClick={onOpen}>
            Edit Projects
          </Button>
          <Button colorScheme="purple" onClick={onOpenDeleteModal}>
            Delete Project
          </Button>
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

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        projectId={_id}
        projectTitle={projectTitle}
        projectNumber={projectNumber}
      />
    </Box>
  );
};

export default ProjectDetails;
