import React, { useState } from 'react';

const categories = ['Work', 'Personal', 'Study', 'Other'];
const priorities = ['Low', 'Medium', 'High'];

export default function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [priority, setPriority] = useState(priorities[1]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask({ title, date, category, priority });
        setTitle('');
        setDate('');
        setCategory(categories[0]);
        setPriority(priorities[1]);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xl mx-auto border border-gray-200 dark:border-gray-700">
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task title..."
                    required
                />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        {priorities.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                + Add Task
            </button>
        </form>
    );
}