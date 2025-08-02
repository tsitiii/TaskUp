"use client"

import React from "react"

export default function TaskStats({ tasks }) {
  const stats = React.useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const pending = total - completed
    const overdue = tasks.filter((task) => {
      if (!task.date || task.completed) return false
      const taskDate = new Date(task.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return taskDate < today
    }).length

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    const priorityStats = {
      High: tasks.filter((task) => task.priority === "High" && !task.completed).length,
      Medium: tasks.filter((task) => task.priority === "Medium" && !task.completed).length,
      Low: tasks.filter((task) => task.priority === "Low" && !task.completed).length,
    }

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate,
      priorityStats,
    }
  }, [tasks])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Overdue</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion Rate</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{stats.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pending by Priority</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">High: {stats.priorityStats.High}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Medium: {stats.priorityStats.Medium}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Low: {stats.priorityStats.Low}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
