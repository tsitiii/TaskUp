"use client"

export default function Sidebar({ selectedFilter, onFilterChange, taskCounts, categories, onSortChange, currentSort }) {
  const sidebarLinks = [
    {
      id: "all",
      label: "All Tasks",
      count: taskCounts.all,
      icon: "📋"
    },
    {
      id: "today",
      label: "Today",
      count: taskCounts.today,
      icon: "📅"
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: taskCounts.upcoming,
      icon: "⏰"
    },
    {
      id: "completed",
      label: "Completed",
      count: taskCounts.completed,
      icon: "✅"
    },
    {
      id: "pending",
      label: "Pending",
      count: taskCounts.pending,
      icon: "⏳"
    },
  ]

  return (
    <aside className="w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Organize your tasks</p>
      </div>

      <nav className="space-y-3 mb-8">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
          Quick Filters
        </h3>
        {sidebarLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onFilterChange(link.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${selectedFilter === link.id
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm"
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {link.icon}
              </span>
              <span className="font-medium">{link.label}</span>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${selectedFilter === link.id
                ? "bg-white/20 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                }`}
            >
              {link.count}
            </span>
          </button>
        ))}
      </nav>

      {categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onFilterChange("category", category.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${selectedFilter === `category-${category.name}`
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm"
                  }`}
              >
                <span className="font-medium">{category.name}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${selectedFilter === `category-${category.name}`
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                    }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
          Sort Options
        </h3>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="created">Date Created</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </aside>
  )
}
