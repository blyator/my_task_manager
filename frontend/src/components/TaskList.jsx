import React from "react";
import Loader from "./Loader";
import { Calendar, Trash2, Edit2, CheckCircle, Circle, Layers } from "lucide-react";

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
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Tasks <span className="text-slate-400 font-normal text-sm">({totalCount})</span>
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === "completed"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">
              No tasks found
            </h3>
            <p className="text-sm text-slate-500">
              {filter === "all" ? "Get started by creating a new task." : "No completed tasks yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 ${
                  task.is_completed ? "opacity-75" : "opacity-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onToggle(task.id)}
                    className={`mt-1 flex-shrink-0 transition-colors ${
                      task.is_completed ? "text-emerald-500" : "text-slate-300 hover:text-blue-500"
                    }`}
                  >
                    {task.is_completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4
                      className={`font-semibold text-base leading-tight mb-1 truncate pr-4 ${
                        task.is_completed
                          ? "text-slate-500 line-through decoration-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </h4>
                    
                    {task.description && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-xs text-slate-400 gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(task.created_at).toLocaleDateString(undefined, {
                           month: 'short', day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
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
