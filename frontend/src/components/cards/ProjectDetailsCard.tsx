'use client'
import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}

interface Project {
    projectTitle: string;
    projectNumber: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface ProjectCardDetailsProps {
    project: Project;
  }
  
  export const ProjectCardDetails: React.FC<ProjectCardDetailsProps> = ({ project }) => {
    const { projectTitle, projectNumber, createdAt, updatedAt } = project;
  
    return (
      <Box p="4" >
        <Heading as="h1" size="lg" mb="4">Project Details</Heading>
        <Text><strong>Project Title:</strong> {projectTitle}</Text>
        <Text><strong>Project Number:</strong> {projectNumber}</Text>
        <Text><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</Text>
        <Text><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</Text>
      </Box>
    );
  };

