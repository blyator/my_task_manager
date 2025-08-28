// components/TaskList.jsx
import React from "react";

const TaskList = ({ data, onDelete, onEdit }) => {
  const tasks = data?.results || [];

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
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
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
