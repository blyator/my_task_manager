import React, { useState } from "react";

const TaskList = ({
  data = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  totalCount = 0,
  completedCount = 0,
  onToggle = () => {},
  onDelete = () => {},
  onEdit = () => {},
  loading = false,
  filter = "all",
  setFilter = () => {},
}) => {
  const tasks = data.results || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  const filteredTasks =
    filter === "completed" ? tasks.filter((task) => task.is_completed) : tasks;

  return (
    <>
      <div className="mb-6">
        <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
          <button
            onClick={() => setFilter("all")}
            className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm bg-blue-200 text-blue-800"
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm bg-green-300 text-green-800"
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-gray-500">
            {filter === "all"
              ? "Add your first task above to get started!"
              : "No tasks match the current filter."}
          </p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default TaskList;
