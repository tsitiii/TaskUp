import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskForm from './TaskForm';

export default function TaskDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState([]);

    function handleToggleTheme() {
        setDarkMode((prev) => !prev);
        document.documentElement.classList.toggle('dark');
    }

    function handleAddTask(task) {
        setTasks((prev) => [task, ...prev]);
    }

    return (
        <div style={{ minHeight: '100vh', background: darkMode ? '#111827' : '#f9fafb', color: darkMode ? '#f9fafb' : '#111827' }}>
            <Header onToggleTheme={handleToggleTheme} darkMode={darkMode} />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flex: 1, padding: 24 }}>
                    <TaskForm onAddTask={handleAddTask} />
                    {/* Beautiful Task List Section */}
                    <div style={{ marginTop: 32 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Your Tasks</h2>
                        {tasks.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 64, color: '#a1a1aa' }}>
                                <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
                                    <rect width="24" height="24" rx="12" fill="#f3f4f6" />
                                    <path d="M8 12h8M8 16h5" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
                                    <rect x="6" y="8" width="12" height="8" rx="2" stroke="#a1a1aa" strokeWidth="2" />
                                </svg>
                                <p style={{ marginTop: 16, fontSize: 18 }}>No tasks yet. Add your first task!</p>
                            </div>
                        ) : (
                            <ul style={{ maxWidth: 600, margin: '0 auto', listStyle: 'none', padding: 0 }}>
                                {tasks.map((task, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            position: 'relative',
                                            padding: 24,
                                            borderRadius: 16,
                                            background: darkMode ? '#1f2937' : '#fff',
                                            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                                            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.04)',
                                            marginBottom: 16,
                                            transition: 'transform 0.15s, box-shadow 0.15s',
                                            color: darkMode ? '#f9fafb' : '#111827',
                                            animation: 'fadeIn 0.5s',
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 18, color: darkMode ? '#60a5fa' : '#2563eb' }}>{task.title}</div>
                                                <div style={{ fontSize: 14, color: darkMode ? '#d1d5db' : '#4b5563', marginTop: 4 }}>
                                                    {task.date && (
                                                        <span style={{ display: 'inline-block', marginRight: 8, padding: '2px 8px', borderRadius: 6, background: darkMode ? '#1e40af' : '#eff6ff', color: darkMode ? '#93c5fd' : '#2563eb', fontSize: 12 }}>
                                                            {task.date}
                                                        </span>
                                                    )}
                                                    <span style={{ display: 'inline-block', marginRight: 8, padding: '2px 8px', borderRadius: 6, background: darkMode ? '#374151' : '#f3f4f6', color: darkMode ? '#f3f4f6' : '#374151', fontSize: 12 }}>
                                                        {task.category}
                                                    </span>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '2px 8px',
                                                        borderRadius: 6,
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        background: task.priority === 'High' ? (darkMode ? '#7f1d1d' : '#fee2e2') : task.priority === 'Medium' ? (darkMode ? '#78350f' : '#fef9c3') : (darkMode ? '#14532d' : '#dcfce7'),
                                                        color: task.priority === 'High' ? (darkMode ? '#fecaca' : '#b91c1c') : task.priority === 'Medium' ? (darkMode ? '#fde68a' : '#b45309') : (darkMode ? '#bbf7d0' : '#15803d'),
                                                    }}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: 28, userSelect: 'none', marginLeft: 16 }}>✅</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <style>{`
                            @keyframes fadeIn {
                                from { opacity: 0; transform: translateY(16px);}
                                to { opacity: 1; transform: none;}
                            }
                        `}</style>
                    </div>
                </main>
            </div>
        </div>
    );
}