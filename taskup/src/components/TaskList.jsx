"use client"

export default function TaskList({ tasks, onToggleComplete, onEditTask, onDeleteTask, selectedFilter }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-lg">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {selectedFilter === "all" ? "No tasks yet" : "No tasks found"}
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400 max-w-md">
          {selectedFilter === "all"
            ? "Start by adding your first task to get organized and boost your productivity!"
            : "No tasks match the current filter. Try changing your filter or add a new task."}
        </p>
        {selectedFilter !== "all" && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            View All Tasks
          </button>
        )}
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900 dark:to-red-800 dark:text-red-200 border-red-200 dark:border-red-700"
      case "Medium":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 dark:from-yellow-900 dark:to-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700"
      case "Low":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-600"
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Work": "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700",
      "Personal": "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 dark:from-purple-900 dark:to-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700",
      "Health": "bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-200 border-green-200 dark:border-green-700",
      "Learning": "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 dark:from-orange-900 dark:to-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700"
    }
    return colors[category] || "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-600"
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString()
    }
  }

  const isOverdue = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 ${task.completed
            ? "border-green-200 dark:border-green-800 opacity-80"
            : "border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
        >
          <div className="p-8">
            <div className="flex items-start gap-6">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${task.completed
                  ? "bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white shadow-lg shadow-green-500/25"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  }`}
              >
                {task.completed && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold text-gray-900 dark:text-white mb-3 ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
                        }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed ${task.completed ? "line-through opacity-60" : ""
                        }`}>
                        {task.description}
                      </p>
                    )}

                    {/* Task Details Section */}
                    <div className="space-y-4">
                      {/* Date, Category, Priority Row */}
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Due Date */}
                        {task.date && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Due:</span>
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium border ${isOverdue(task.date) && !task.completed
                                ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900 dark:to-red-800 dark:text-red-200 border-red-200 dark:border-red-700"
                                : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700"
                                }`}
                            >
                              📅 {formatDate(task.date)}
                              {isOverdue(task.date) && !task.completed && " ⚠️ Overdue"}
                            </span>
                          </div>
                        )}

                        {/* Category */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</span>
                          <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium border ${getCategoryColor(task.category)}`}>
                            {task.category}
                          </span>
                        </div>

                        {/* Priority */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority:</span>
                          <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      {/* Tags Section */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Tags:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {task.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Made More Prominent */}
                  <div className="flex flex-col items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 min-w-[120px]">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Actions</span>
                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => onEditTask(task)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                        title="Edit task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>

                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                        title="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
