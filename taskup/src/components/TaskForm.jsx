"use client"

import { useState, useEffect } from "react"

const categories = ["Work", "Personal", "Study", "Other"]
const priorities = ["Low", "Medium", "High"]

export default function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [priority, setPriority] = useState(priorities[1])
  const [tags, setTags] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDate(editingTask.date || "")
      setCategory(editingTask.category)
      setPriority(editingTask.priority)
      setTags(editingTask.tags ? editingTask.tags.join(", ") : "")
    }
  }, [editingTask])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    const taskData = {
      title: title.trim(),
      date,
      category,
      priority,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
    }

    if (editingTask) {
      onUpdateTask({ ...editingTask, ...taskData })
    } else {
      onAddTask({ ...taskData, id: Date.now() })
    }
    setTitle("")
    setDate("")
    setCategory(categories[0])
    setPriority(priorities[1])
    setTags("")
  }

  function handleCancel() {
    setTitle("")
    setDate("")
    setCategory(categories[0])
    setPriority(priorities[1])
    setTags("")
    if (onCancelEdit) onCancelEdit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="date">
              Due Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, urgent, meeting..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
