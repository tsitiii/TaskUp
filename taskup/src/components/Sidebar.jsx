"use client"

export default function Sidebar({ selectedFilter, onFilterChange, taskCounts, categories, onSortChange, currentSort }) {
  const sidebarLinks = [
    {
      id: "all",
      label: "All Tasks",
      count: taskCounts.all,
    },
    {
      id: "today",
      label: "Today",
      count: taskCounts.today,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: taskCounts.upcoming,
    },
    {
      id: "completed",
      label: "Completed",
      count: taskCounts.completed,
    },
    {
      id: "pending",
      label: "Pending",
      count: taskCounts.pending,
    },
  ]

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 h-full overflow-y-auto">
      <nav className="space-y-2 mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Filters</h3>
        {sidebarLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onFilterChange(link.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              selectedFilter === link.id
                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                selectedFilter === link.id
                  ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
              }`}
            >
              {link.count}
            </span>
          </button>
        ))}
      </nav>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onFilterChange("category", category.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                selectedFilter === `category-${category.name}`
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Sort By</h3>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
