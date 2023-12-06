import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  completeTask,
  deleteTask,
  getTasks,
  incompleteTask,
} from "../services/TaskService";

const useListTask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addNewTask = () => {
    navigate("/add-task");
  };

  const updateTask = (id) => {
    navigate(`/update-task/${id}`);
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const completeTaskMethod = async (id) => {
    await completeTask(id);
    fetchTasks();
  };

  const incompleteTaskMethod = async (id) => {
    await incompleteTask(id);
    fetchTasks();
  };

  return {
    tasks,
    addNewTask,
    updateTask,
    removeTask,
    completeTaskMethod,
    incompleteTaskMethod,
  };
};

export default useListTask;