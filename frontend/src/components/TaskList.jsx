import { Clipboard } from "lucide-react";

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
  const taskCount = data.count || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-6 sm:mb-8">
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

      {/* Task List */}
      <div className="space-y-3 mb-6">
        {tasks.length === 0 ? (
          <div className="text-center py-8 sm:py-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Clipboard className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              No tasks found
            </h3>
            <p className="text-sm text-gray-500 px-4">
              {filter === "all"
                ? "Add your first task above to get started!"
                : "No tasks match the current filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      onChange={() => onToggle(task.id)}
                      className="h-4 w-4 text-blue-600 rounded mt-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`font-medium text-sm break-words ${
                          task.is_completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-gray-600 mt-1 break-words">
                          {task.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Created:{" "}
                        {new Date(task.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 flex-shrink-0">
                    <button
                      onClick={() => onEdit(task)}
                      className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 hover:text-red-800 text-xs px-2 py-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
