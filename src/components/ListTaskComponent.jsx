import { useEffect, useState } from "react";
import {
  completeTask,
  deleteTask,
  getTasks,
  incompleteTask,
} from "../services/TaskService";
import { useNavigate } from "react-router-dom";
import useListTask from "../hooks/useListTask";

const ListTaskComponent = () => {
  /*   const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addNewTodo = () => {
    navigate("/add-todo");
  };

  const updateTodo = (id) => {
    navigate(`/update-todo/${id}`);
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const completeTodoMethod = async (id) => {
    await completeTodo(id);
    fetchTodos();
  };

  const incompleteTodoMethod = async (id) => {
    await incompleteTodo(id);
    fetchTodos();
  };
 */

  const {
    tasks,
    addNewTask,
    updateTask,
    removeTask,
    completeTaskMethod,
    incompleteTaskMethod,
  } = useListTask();

  return (
    <div className="container">
      <h2 className="text-center mt-3">List of Tasks</h2>
      <button className="btn btn-outline-primary mb-2" onClick={addNewTask}>
        Add Task
      </button>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Task Completed</th>
              <th>Action #1</th>
              <th>Action #2</th>
              <th>Action #3</th>
              <th>Action #4</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? "Completed" : "In Progress"}</td>
                <td>
                  <button
                    onClick={() => updateTask(task.id)}
                    className="btn btn-outline-info btn-sm"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => completeTaskMethod(task.id)}
                    className="btn btn-outline-info btn-sm"
                  >
                    Complete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => incompleteTaskMethod(task.id)}
                    className="btn btn-outline-info btn-sm"
                  >
                    In Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTaskComponent;