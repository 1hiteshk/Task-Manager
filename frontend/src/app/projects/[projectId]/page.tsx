"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import TaskList from "@/components/TaskLists";
import { Button, useDisclosure } from "@chakra-ui/react";
import TaskModal from "@/components/TaskModal";
import UpdatedTaskList from "@/components/UpdatedTaskList";
import Calendar from "@/components/Calendar";
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from "react-redux";
import {
  addUserProject,
  fetchByProjectId,
  fetchProjectById,
} from "@/redux/projects/projectsSlice";

// Define the project interface
interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  userId: string | any;
  createdAt?: string;
  updatedAt?: string;
}

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params?.projectId;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Replace 'any[]' with the actual task interface
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const userProjects = useSelector(
    (state: RootState) => state.projects.projects
  );
  // Access user details from Redux store
  const userId = useSelector((state: RootState) => state.userDetails.id);

  /* useEffect(() => {
    if (id) {
      const fetchIdProject = async () => {
       
        try {
          const res = await api.get(`/projects/${id}`);
          console.log(res.data);
          setProject(res.data);
        } catch (error) {
          console.error('Error fetching project details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchIdProject();
    }
  }, [id]); */

  /*  useEffect(() => {
    if (projectId) {
      const existingProject = userProjects.find((project) => project._id === projectId);
      if (existingProject) {
        setProject(existingProject);
        setLoading(false);
      } else {
        dispatch(fetchProjectById(String(projectId))).then((action:any) => {
          if (action.payload) {
            setProject(action.payload as Project);
            dispatch(addUserProject(action.payload as Project));
          }
          setLoading(false);
        });
      }
    }
  }, [projectId, userProjects]); */

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const existingProject = userProjects.find(
          (project) => project._id === projectId
        );
        if (existingProject) {
          setProject(existingProject);
          setLoading(false);
        } else {
          const newProject = await fetchByProjectId(String(projectId));
          setProject(newProject as any);
          const project2 = { newProject, userId };
          dispatch(addUserProject(project2 as any));
          setLoading(false);
        }
      }
    };
    fetchProject();
  }, [projectId]);

  console.log({ userProjects });

  const handleSave = () => {
    setRefreshTasks((prev) => !prev); // Toggle refreshTasks state
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found or an error occurred.</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <p>
        <strong>Project Title:</strong> {project.projectTitle}
      </p>
      <p>
        <strong>Project Number:</strong> {project.projectNumber}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(String(project.createdAt)).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(String(project.updatedAt)).toLocaleString()}
      </p>

      {/*  <Button onClick={onOpen}>Add Task</Button> */}
      <Calendar projectId={project._id} refreshTasks={refreshTasks} />

      {/*    <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        projectId={project?._id}
        onSave={handleSave}
      /> */}

      {/*  {project._id && <UpdatedTaskList tasks={tasks} />} */}
      {/*   {project._id && <TaskList projectId={project._id} refreshTasks={refreshTasks}/>} */}
    </div>
  );
};

export default ProjectDetails;
