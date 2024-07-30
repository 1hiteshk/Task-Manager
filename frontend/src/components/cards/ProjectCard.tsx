// components/ProjectCard.tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { formatCreatedAt, formatUpdatedAt } from "@/utils/formatDate";
import api from "@/utils/api";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { removeUserProject } from "@/redux/projects/projectsSlice";
import { deleteTasksByProjectId } from "@/redux/tasks/tasksSlice";
import Link from "next/link";
import CustomToast from "../toast/CustomToast";

// Correct type definition
type Project = {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  projectDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Define props type for the component
interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const { _id, projectNumber, projectTitle, createdAt, updatedAt } = data;
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${_id}`); // Make API call to delete project
      dispatch(removeUserProject(_id)); // Dispatch action to update the Redux state
      dispatch(deleteTasksByProjectId(_id));
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
    }
  };

  return (
    <Card
      p={{base:6, md:10}}
      variant={"filled"}
      bgColor={"#8d30f4"}
      borderRadius="md"
      color="white"
      textAlign="center"
      boxShadow="lg"
    >
      <Link href={`/projects/${_id}`}>
        <CardHeader>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"10px"}
          >
            {" "}
            <Image
              src="/images/project1.png"
              alt="Project Icon"
              boxSize="50px"
              borderRadius={"6px"}
              mt={'20px'}
              mb={4}
            />
            <Heading size="lg">Project {projectNumber}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading size="lg" fontWeight={700}>{projectTitle}</Heading>
        </CardBody>
        <CardFooter display={"flex"} flexDir={"column"}>
          <Text>Created at: {formatCreatedAt(String(createdAt))}</Text>
         {/*  {updatedAt && <Text>Updated at: {formatUpdatedAt(updatedAt)}</Text>} */}
        </CardFooter>
      </Link>
      {/* <Button mb={4} onClick={handleDelete}>
        Delete Project
      </Button> */}
    </Card>
  );
};

export default ProjectCard;
