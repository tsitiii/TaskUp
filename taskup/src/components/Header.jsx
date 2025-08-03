"use client"

export default function Header({ onToggleTheme, darkMode }) {
    return (
        <header className="flex items-center justify-between px-8 py-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        TaskUp
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Productivity Simplified</p>
                </div>
            </div>
            <button
                onClick={onToggleTheme}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 group"
                aria-label="Toggle dark mode"
            >
                <div className="relative">
                    {darkMode ? (
                        <span className="text-xl group-hover:rotate-12 transition-transform duration-200">🌙</span>
                    ) : (
                        <span className="text-xl group-hover:rotate-12 transition-transform duration-200">☀️</span>
                    )}
                </div>
                <span className="hidden sm:inline font-medium">
                    {darkMode ? 'Dark' : 'Light'} Mode
                </span>
            </button>
        </header>
    );
}
