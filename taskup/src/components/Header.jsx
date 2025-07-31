import React from 'react';

export default function Header({ onToggleTheme, darkMode }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold tracking-tight">TaskUp</h1>
            <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <span className="text-xl">🌙</span>
                ) : (
                    <span className="text-xl">☀️</span>
                )}
                <span className="hidden sm:inline">{darkMode ? 'Dark' : 'Light'} Mode</span>
            </button>
        </header>
    );
}