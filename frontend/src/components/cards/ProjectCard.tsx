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
  Box,
  Stack,
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

  return (
    <Stack
      p={{base:3, md:6}}
      width={{base:'240px', md:'320px',lg:'420px'}}
      height={{base:'240px', md:'320px',lg:''}}
      //variant={"filled"}
      bgColor={"#8d30f4"}
      borderRadius="md"
      color="white"
      textAlign="center"
      boxShadow="lg"
    >
      <Link href={`/projects/${_id}`}>
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
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
            <Heading as={'h2'} whiteSpace={'nowrap'}>Project {projectNumber}</Heading>
          </Flex>
        </Box>
         <Flex flexDirection={'column'} gap={{base:'20px',sm:'30px',md:'50px'}} justifyContent={'space-between'}>
         <Text textAlign={'center'} fontSize={{base:'20px',md:'22px',lg:'32px'}} fontWeight={700}>{projectTitle}</Text>
         <Text textAlign={'center'} fontSize={{base:'20px',md:'22px',lg:'32px'}}>Created at: {formatCreatedAt(String(createdAt))}</Text>
         </Flex>
      </Link>
    </Stack>
  );
};

export default ProjectCard;
