// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";

export const BASE_URL = "http://127.0.0.1:8000/api";

const App = () => {
  const [taskData, setTaskData] = useState({ results: [] });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tasks/`)
      .then((response) => setTaskData(response.data))
      .catch((error) => console.error("error fetching tasks", error));
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <Pagination />
        <TaskList data={taskData} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
