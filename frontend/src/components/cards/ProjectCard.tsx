// components/ProjectCard.tsx
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
import { formatCreatedAt,formatUpdatedAt } from '@/utils/formatDate';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { removeUserProject } from '@/redux/projects/projectsSlice';
import { deleteTasksByProjectId } from '@/redux/tasks/tasksSlice';

// Correct type definition
type Project = {
  _id: string;
  projectNumber: string;
  projectTitle: string;
  projectDate?: string;
  createdAt: string;
  updatedAt: string;
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
        title: 'Project deleted.',
        description: "The project and its associated tasks have been deleted.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: 'Error deleting project.',
        description: "There was an error deleting the project.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card variant={'filled'} border={'2px solid black'}>
      <CardHeader>
        <Heading size='md'>{projectTitle}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Project Number: {projectNumber}</Text>
        
      </CardBody>
      <CardFooter display={'flex'} flexDir={'column'}>
      <Text>Created at: {formatCreatedAt(createdAt)}</Text>
      {updatedAt && <Text>Updated at: {formatUpdatedAt(updatedAt)}</Text>}
      </CardFooter>
      <Button mb={4} onClick={handleDelete}>Delete Project</Button>
    </Card>
  );
};

export default ProjectCard;
