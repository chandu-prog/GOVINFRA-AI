import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '16px 32px 16px 16px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
