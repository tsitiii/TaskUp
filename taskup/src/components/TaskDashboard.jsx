"use client"

import { useState, useMemo } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

export default function TaskDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)
  const [sortBy, setSortBy] = useState("created")

  function handleToggleTheme() {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle("dark")
  }

  function handleAddTask(task) {
    setTasks((prev) => [task, ...prev])
  }

  function handleUpdateTask(updatedTask) {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  function handleDeleteTask(taskId) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }
  }

  function handleToggleComplete(taskId) {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  function handleEditTask(task) {
    setEditingTask(task)
  }

  function handleCancelEdit() {
    setEditingTask(null)
  }

  function handleFilterChange(filter, value) {
    if (filter === "category") {
      setSelectedFilter(`category-${value}`)
    } else {
      setSelectedFilter(filter)
    }
  }

  function handleSortChange(newSort) {
    setSortBy(newSort)
  }
  const taskCounts = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return {
      all: tasks.length,
      today: tasks.filter((task) => {
        if (!task.date) return false
        const taskDate = new Date(task.date)
        return taskDate.toDateString() === today.toDateString()
      }).length,
      upcoming: tasks.filter((task) => {
        if (!task.date) return false
        const taskDate = new Date(task.date)
        return taskDate > today
      }).length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    }
  }, [tasks])

  const categories = useMemo(() => {
    const categoryMap = {}
    tasks.forEach((task) => {
      categoryMap[task.category] = (categoryMap[task.category] || 0) + 1
    })
    return Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
  }, [tasks])
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]
    switch (selectedFilter) {
      case "today":
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        filtered = filtered.filter((task) => {
          if (!task.date) return false
          const taskDate = new Date(task.date)
          return taskDate.toDateString() === today.toDateString()
        })
        break
      case "upcoming":
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        filtered = filtered.filter((task) => {
          if (!task.date) return false
          const taskDate = new Date(task.date)
          return taskDate > now
        })
        break
      case "completed":
        filtered = filtered.filter((task) => task.completed)
        break
      case "pending":
        filtered = filtered.filter((task) => !task.completed)
        break
      default:
        if (selectedFilter.startsWith("category-")) {
          const category = selectedFilter.replace("category-", "")
          filtered = filtered.filter((task) => task.category === category)
        }
        break
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.date && !b.date) return 0
          if (!a.date) return 1
          if (!b.date) return -1
          return new Date(a.date) - new Date(b.date)
        case "priority":
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "title":
          return a.title.localeCompare(b.title)
        case "created":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return filtered
  }, [tasks, selectedFilter, sortBy])

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header onToggleTheme={handleToggleTheme} darkMode={darkMode} />

        <div className="flex h-[calc(100vh-73px)]">
          <Sidebar
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            taskCounts={taskCounts}
            categories={categories}
            onSortChange={handleSortChange}
            currentSort={sortBy}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              <TaskForm
                onAddTask={handleAddTask}
                editingTask={editingTask}
                onUpdateTask={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
              />

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tasks ({filteredAndSortedTasks.length})
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Sorted by{" "}
                    {sortBy === "created"
                      ? "Date Created"
                      : sortBy === "dueDate"
                        ? "Due Date"
                        : sortBy === "priority"
                          ? "Priority"
                          : "Title"}
                  </div>
                </div>

                <TaskList
                  tasks={filteredAndSortedTasks}
                  onToggleComplete={handleToggleComplete}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  selectedFilter={selectedFilter}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
