import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Pagination from "./components/Pagination";

export const BASE_URL = "http://127.0.0.1:8000/api";

const App = () => {
  const [taskData, setTaskData] = useState({
    results: [],
    next: null,
    previous: null,
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks(`${BASE_URL}/tasks/`);
  }, []);

  const fetchTasks = (url) => {
    axios
      .get(url)
      .then((response) => setTaskData(response.data))
      .catch((error) => console.error("error fetching tasks", error));
  };

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        fetchTasks(`${BASE_URL}/tasks/`);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        fetchTasks(`${BASE_URL}/tasks/`);
        setEditingTask(null); // clear edit mode
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
        }));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handlePageChange = (url) => {
    if (url) {
      fetchTasks(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
        />
        <TaskList
          data={taskData}
          onDelete={handleDelete}
          onEdit={setEditingTask}
        />
        <Pagination
          previous={taskData.previous}
          next={taskData.next}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
