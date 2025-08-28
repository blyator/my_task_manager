import { Clipboard } from "lucide-react";

const TaskList = ({ data = { results: [] }, onDelete = () => {} }) => {
  const tasks = data.results || [];

  return (
    <div className="space-y-3 mb-6">
      {tasks.length === 0 ? (
        <div className="text-center py-8 sm:py-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Clipboard className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
            No tasks found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-gray-800">
                  {task.title}
                </h4>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
