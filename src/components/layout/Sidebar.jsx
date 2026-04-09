import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, PlusCircle, BarChart3, Settings, LogOut, Shield, LineChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Overview', icon: Home, roles: ['authority'] },
  { path: '/map', label: 'Live Map', icon: MapIcon, roles: ['citizen', 'authority'] },
  { path: '/report', label: 'Report Issue', icon: PlusCircle, roles: ['citizen', 'authority'] },
  { path: '/predictive', label: 'Predictive', icon: LineChart, roles: ['authority'] },
  { path: '/contractors', label: 'Contractors', icon: Shield, roles: ['authority'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['authority'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['authority'] },
];

export function Sidebar() {
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => item.roles.includes(user));
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-glow"></div>
        <h2 className="text-gradient">GOVINFRA AI</h2>
      </div>

      <nav className="sidebar-nav">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile" style={{ marginBottom: '16px' }}>
          <div className="avatar">{user === 'authority' ? 'A' : 'C'}</div>
          <div className="user-info">
            <span className="user-name">{user === 'authority' ? 'Admin User' : 'Citizen'}</span>
            <span className="user-role">{user === 'authority' ? 'City Council' : 'Verified User'}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="nav-link"
          style={{ width: '100%', color: 'var(--status-severe)', padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
