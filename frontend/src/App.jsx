import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export const BASE_URL = "http://127.0.0.1:8000/api";

const App = () => {
  const [taskData, setTaskData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/tasks/`)
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <TaskForm />
        <TaskList data={taskData} loading={loading} />
      </div>
    </div>
  );
};

export default App;
