import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Logo } from '@/components/ui/Logo'

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    name: 'Notifications',
    path: '/students',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo-wrapper">
          <div className="sidebar-logo-icon">
            <Logo size={32} />
          </div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <h1 className="sidebar-title">BreakBuddy</h1>
            </div>
          )}
        </div>
        {!collapsed && (
          <p className="sidebar-subtitle">Parent Dashboard</p>
        )}
        <button
          onClick={onToggle}
          className="sidebar-toggle"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className="sidebar-toggle-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="sidebar-nav-text">{item.name}</span>
                      {isActive && <div className="sidebar-nav-indicator"></div>}
                    </>
                  )}
                  {collapsed && isActive && <div className="sidebar-nav-active-bar"></div>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              {user?.email?.[0]?.toUpperCase() || user?.id?.[0] || 'A'}
            </div>
            {!collapsed && (
              <div className="sidebar-user-details">
                <p className="sidebar-user-name">
                  {user?.email || `Admin #${user?.id}`}
                </p>
                <p className="sidebar-user-role">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}