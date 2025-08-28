import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import TaskForm from "./components/TaskForm";

export const BASE_URL = "https://my-task-manager-qcv8.onrender.com/api";

const App = () => {
  const [taskData, setTaskData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [TotalCount, setTotalCount] = useState(0);
  const [pageUrl, setPageUrl] = useState(`${BASE_URL}/tasks`);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (filter === "completed") {
      setPageUrl(`${BASE_URL}/tasks/?is_completed=true`);
    } else {
      setPageUrl(`${BASE_URL}/tasks/`);
    }
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(pageUrl)
      .then((response) => {
        setTaskData(response.data);
        if (filter === "all") {
          setTotalCount(response.data.count);
        }
      })
      .catch((error) => console.error("error fetching tasks", error));

    Promise.all([
      axios.get(`${BASE_URL}/tasks/`),
      axios.get(`${BASE_URL}/tasks/?is_completed=true`),
    ])
      .then(([allTasksResponse, completedTasksResponse]) => {
        setTotalCount(allTasksResponse.data.count);
        setCompletedCount(completedTasksResponse.data.count);
      })
      .catch((error) => console.error("error fetching counts", error))
      .finally(() => {
        setLoading(false);
      });
  }, [pageUrl, filter]);

  const addTask = async (taskData) => {
    const response = await fetch(`${BASE_URL}/tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    const result = await response.json();

    const updatedResponse = await axios.get(pageUrl);
    setTaskData(updatedResponse.data);
    setTotalCount((prev) => prev + 1);

    return result;
  };

  const updateTask = async (id, taskData) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    const result = await response.json();

    const updatedResponse = await axios.get(pageUrl);
    setTaskData(updatedResponse.data);

    return result;
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTaskData((prev) => ({
          ...prev,
          results: prev.results.filter((task) => task.id !== id),
          count: prev.count - 1,
        }));

        setTotalCount((prev) => prev - 1);

        const deletedTask = taskData.results.find((task) => task.id === id);
        if (deletedTask && deletedTask.is_completed) {
          setCompletedCount((prev) => prev - 1);
        }
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onToggle = (taskId) => {
    const task = taskData.results.find((task) => task.id === taskId);
    if (task) {
      const newCompletedStatus = !task.is_completed;

      updateTask(taskId, {
        is_completed: newCompletedStatus,
      });

      if (newCompletedStatus) {
        setCompletedCount((prev) => prev + 1);
      } else {
        setCompletedCount((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <TaskList
          data={taskData}
          completedCount={completedCount}
          loading={loading}
          totalCount={TotalCount}
          filter={filter}
          setFilter={setFilter}
          onDelete={handleDelete}
          onEdit={setEditingTask}
          onToggle={onToggle}
        />
        {(taskData.previous || taskData.next) && (
          <Pagination
            previous={taskData.previous}
            next={taskData.next}
            onPageChange={(url) => url && setPageUrl(url)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
