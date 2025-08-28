import React, { useState, useEffect } from "react";

function TaskForm({ addTask, updateTask, editingTask, setEditingTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [editingTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title,
      description: formData.description || null,
    };

    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
      setFormData({ title: "", description: "" });
    }

    setEditingTask(null);
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setEditingTask(null);
  };

  return (
    <div className="grid grid-cols-1 gap-3 mt-20 mb-8">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Task title"
              required
              className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Task description"
              rows={3}
              className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-md"
            >
              {editingTask ? "Update" : "Add Task"}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1.5 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
