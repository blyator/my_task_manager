import React, { useState } from "react";

const TaskList = ({ data }) => {
  const [filter, setFilter] = useState("all");
  const tasks = data?.results || [];

  const filteredTasks =
    filter === "completed" ? tasks.filter((task) => task.is_completed) : tasks;

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-100 rounded"
          >
            <div>
              <span
                className={`font-medium ${
                  task.is_completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
              )}
              {task.created_at && (
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(task.created_at).toLocaleString()}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
