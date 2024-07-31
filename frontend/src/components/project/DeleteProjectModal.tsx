"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import api from "@/utils/api";
import CustomToast from "@/components/toast/CustomToast";
import { AppDispatch } from "@/redux/store";
import { removeUserProject } from "@/redux/projects/projectsSlice";
import { deleteTasksByProjectId } from "@/redux/tasks/tasksSlice";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  projectNumber: number;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  projectNumber,
}) => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/projects/${projectId}`);
      handleProjectDeleted();
      toast({
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
        render: ({ onClose }) => (
          <CustomToast
            duration={5000}
            title={`Project ${projectNumber} deleted.`}
            description={`The project ${projectTitle} and its associated tasks have been deleted.`}
            status="success"
            onClose={onClose}
          />
        ),
      });
      router.push(`/projects`);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: ({ onClose }) => (
          <CustomToast
            duration={5000}
            title={`Error deleting project ${projectNumber}.`}
            description="There was an error deleting the project."
            status="error"
            onClose={onClose}
          />
        ),
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleProjectDeleted = () => {
    dispatch(removeUserProject(projectId));
    dispatch(deleteTasksByProjectId(projectId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the project "{projectTitle}"?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            ml={3}
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose} isDisabled={isLoading}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProjectModal;
