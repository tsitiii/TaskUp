"use client"

import { useMemo, useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

export default function TaskDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete project presentation",
      description: "Prepare slides for the quarterly review meeting",
      category: "Work",
      priority: "High",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      completed: false,
      tags: ["presentation", "meeting"],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, bread, eggs, and vegetables",
      category: "Personal",
      priority: "Medium",
      date: new Date().toISOString().split('T')[0], // Today
      completed: true,
      tags: ["shopping", "food"],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "3",
      title: "Review code changes",
      description: "Check pull requests and provide feedback",
      category: "Work",
      priority: "High",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      completed: false,
      tags: ["code", "review"],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "4",
      title: "Call dentist",
      description: "Schedule annual checkup appointment",
      category: "Health",
      priority: "Low",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
      completed: false,
      tags: ["health", "appointment"],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "5",
      title: "Read React documentation",
      description: "Study new features in React 18",
      category: "Learning",
      priority: "Medium",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 3 days
      completed: false,
      tags: ["react", "documentation"],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "6",
      title: "Plan weekend trip",
      description: "Research destinations and book accommodation",
      category: "Personal",
      priority: "Medium",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 2 weeks
      completed: false,
      tags: ["travel", "planning"],
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  ])
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
      case "today": {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        filtered = filtered.filter((task) => {
          if (!task.date) return false
          const taskDate = new Date(task.date)
          return taskDate.toDateString() === today.toDateString()
        })
        break
      }
      case "upcoming": {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        filtered = filtered.filter((task) => {
          if (!task.date) return false
          const taskDate = new Date(task.date)
          return taskDate > now
        })
        break
      }
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
        case "priority": {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
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

          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to TaskUp
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay organized and boost your productivity with smart task management
                </p>
              </div>

              <TaskForm
                onAddTask={handleAddTask}
                editingTask={editingTask}
                onUpdateTask={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
              />

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Your Tasks
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {filteredAndSortedTasks.length} {filteredAndSortedTasks.length === 1 ? 'task' : 'tasks'} found
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      Sorted by{" "}
                      <span className="font-medium">
                        {sortBy === "created"
                          ? "Date Created"
                          : sortBy === "dueDate"
                            ? "Due Date"
                            : sortBy === "priority"
                              ? "Priority"
                              : "Title"}
                      </span>
                    </div>
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
