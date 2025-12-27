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
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-1">
        {editingTask ? "Edit Task" : "New Task"}
      </h2>
      <p className="text-sm text-slate-500 mb-5">
        {editingTask ? "Update your task details below." : "What needs to be done?"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Buy groceries"
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-slate-400 font-normal">(Optional)</span></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add details..."
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            {editingTask ? "Save Changes" : "Create Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
