import React, { useState } from 'react';

const sidebarLinks = [
    { label: 'All Tasks', content: 'Here are all your tasks. Stay organized and productive!' },
    { label: 'Today', content: "Today's tasks: Focus on what's important now!" },
    { label: 'Upcoming', content: 'Upcoming tasks: Plan ahead for a stress-free workflow.' },
    { label: 'Categories', content: 'Categories: Group your tasks for better clarity.' },
];

export default function Sidebar() {
    const [selected, setSelected] = useState(0);

    return (
        <aside style={{ minWidth: 220, background: '#f9fafb', color: '#111827', borderRight: '1px solid #e5e7eb', padding: 16, display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sidebarLinks.map((link, idx) => (
                    <button
                        key={link.label}
                        onClick={() => setSelected(idx)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            background: selected === idx ? '#2563eb' : 'transparent',
                            color: selected === idx ? '#fff' : '#111827',
                            border: 'none',
                            textAlign: 'left',
                            fontWeight: 500,
                            cursor: 'pointer',
                            marginBottom: 2,
                            transition: 'background 0.15s, color 0.15s',
                        }}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <div style={{ marginTop: 32, fontSize: 15, color: '#374151', background: '#e0e7ef', borderRadius: 8, padding: 16, minHeight: 80 }}>
                {sidebarLinks[selected].content}
            </div>
        </aside>
    );
}