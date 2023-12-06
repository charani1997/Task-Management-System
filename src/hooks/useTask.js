import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, getTaskById, updateTask } from "../services/TaskService";

const useTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [titleDescription, setTitleDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const saveOrUpdateTask = async (e) => {
    e.preventDefault();
    const task = { title, description, status };

    if (title && description) {
      if (id) {
        try {
          await updateTask(id, task);
          console.log("Task updated successfully");
          navigate("/tasks");
        } catch (error) {
          console.error("Error updating task:", error);
        }
      } else {
        try {
          await addTask(task);
          console.log("Task added successfully");
          navigate("/tasks");
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  const getTaskData = async (id) => {
    const response = await getTaskById(id);
    const data = response.data;
    setTitle(data.title);
    setDescription(data.description);
    setStatus(data.completed);
  };

  useEffect(() => {
    if (id) {
      setTitleDescription("Update Task");
      getTaskData(id);
    } else {
      setTitleDescription("Add Task");
    }
  }, [id]);

  return {
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    titleDescription,
    saveOrUpdateTask,
  };
};

export default useTask;