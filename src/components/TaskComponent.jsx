import useTask from "../hooks/useTask";

const TaskComponent = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    dueDate,
    titleDescription,
    saveOrUpdateTask,
  } = useTask();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{titleDescription}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Task Title:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter task"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Task Description:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter todo description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Task Status:</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="false">Completed</option>
                  <option value="true">In Progress</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Due Date:</label>
                <input
                  className="form-control"
                  type="date"
                  placeholder="Enter date"
                  name="date"
                  value={dueDate}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <button
                className="btn btn-outline-success"
                onClick={(e) => saveOrUpdateTask(e)}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;