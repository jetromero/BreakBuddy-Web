import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { getAdminDashboardStats, type AdminDashboardStats, getUsageTrend, getTopStudents, getHourlyScreentime } from '@/lib/api/analytics'
import { CardStat } from '@/components/ui/CardStat'
import { ChartBar } from '@/components/ui/ChartBar'
import { ChartLine } from '@/components/ui/ChartLine'
import { formatMinutes } from '@/lib/utils/formatTime'

export function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [usageTrendRange, setUsageTrendRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [usageTrendData, setUsageTrendData] = useState<Array<{ date: string; minutes: number }>>([])
  const [topStudentsRange, setTopStudentsRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [topStudentsData, setTopStudentsData] = useState<Array<{ id: string; name: string; minutes: number; avatar_url: string | null }>>([])
  const [topStudentsSortOrder, setTopStudentsSortOrder] = useState<'desc' | 'asc'>('desc')
  const [hourlyScreentime, setHourlyScreentime] = useState<Array<{ hour: string; minutes: number }>>([])

  useEffect(() => {
    fetchStats()
    fetchHourlyScreentime()
  }, [user])

  useEffect(() => {
    fetchUsageTrend()
  }, [usageTrendRange])

  useEffect(() => {
    fetchTopStudents()
  }, [topStudentsRange])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await getAdminDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHourlyScreentime = async () => {
    try {
      const data = await getHourlyScreentime(undefined)
      setHourlyScreentime(data)
    } catch (error) {
      console.error('Failed to fetch hourly screentime:', error)
    }
  }

  const fetchUsageTrend = async () => {
    try {
      const data = await getUsageTrend(usageTrendRange, undefined)
      setUsageTrendData(data)
    } catch (error) {
      console.error('Failed to fetch usage trend:', error)
    }
  }

  const fetchTopStudents = async () => {
    try {
      const data = await getTopStudents(topStudentsRange, undefined)
      setTopStudentsData(data)
    } catch (error) {
      console.error('Failed to fetch top students:', error)
    }
  }


  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="loading-wrapper">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p className="loading-message">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="page-wrapper">
        <div className="empty-state-wrapper">
          <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="empty-state-heading">Failed to load analytics</h3>
          <p className="empty-state-subtext">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header-section">
        <div className="page-info">
          <h1 className="page-heading">Admin Dashboard</h1>
          <p className="page-subheading">Overview of all users and app usage analytics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        <CardStat
          title="Total Users"
          value={stats.totalUsers}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="40" height="40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <CardStat
          title="Most Used App"
          value={stats.mostUsedApps[0]?.appName || 'N/A'}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <CardStat
          title="Children Users"
          value={stats.totalChildren}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="40" height="40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <CardStat
          title="Avg Daily Screen Time"
          value={formatMinutes(stats.avgDailyScreenTime)}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="40" height="40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Usage Trend */}
        <div className="dashboard-card usage-trend-card">
          <div className="card-header-with-badge">
            <h2 className="card-main-title">Usage Trend</h2>
            <div className="time-range-selector">
              <button
                className={`time-range-btn ${usageTrendRange === 'daily' ? 'active' : ''}`}
                onClick={() => setUsageTrendRange('daily')}
              >
                Daily
              </button>
              <button
                className={`time-range-btn ${usageTrendRange === 'weekly' ? 'active' : ''}`}
                onClick={() => setUsageTrendRange('weekly')}
              >
                Weekly
              </button>
              <button
                className={`time-range-btn ${usageTrendRange === 'monthly' ? 'active' : ''}`}
                onClick={() => setUsageTrendRange('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          <ChartLine data={usageTrendData} dataKey="minutes" strokeColor="#2b8fa3" />
        </div>

        {/* Top 10 Children */}
        <div className="dashboard-card top-students-card">
          <div className="card-header-with-badge">
            <h2 className="card-main-title">Top 10 Children</h2>
            <div className="top-students-controls">
              <button
                className="sort-toggle-btn"
                onClick={() => setTopStudentsSortOrder(topStudentsSortOrder === 'desc' ? 'asc' : 'desc')}
                title={topStudentsSortOrder === 'desc' ? 'Highest first' : 'Lowest first'}
              >
                {topStudentsSortOrder === 'desc' ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
              <div className="time-range-selector">
                <button
                  className={`time-range-btn ${topStudentsRange === 'daily' ? 'active' : ''}`}
                  onClick={() => setTopStudentsRange('daily')}
                >
                  Daily
                </button>
                <button
                  className={`time-range-btn ${topStudentsRange === 'weekly' ? 'active' : ''}`}
                  onClick={() => setTopStudentsRange('weekly')}
                >
                  Weekly
                </button>
                <button
                  className={`time-range-btn ${topStudentsRange === 'monthly' ? 'active' : ''}`}
                  onClick={() => setTopStudentsRange('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
          <div className="top-performers-list scrollable">
            {[...topStudentsData]
              .sort((a, b) => topStudentsSortOrder === 'desc' ? b.minutes - a.minutes : a.minutes - b.minutes)
              .slice(0, 10)
              .map((student, index) => (
                <div
                  key={student.id}
                  className="performer-item clickable"
                  onClick={() => navigate(`/children/${student.id}`)}
                >
                  <div className="performer-info">
                    <div
                      className={`rank-badge ${index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'rank-default'}`}
                    >
                      {index + 1}
                    </div>
                    {student.avatar_url ? (
                      <img src={student.avatar_url} alt={student.name} className="performer-avatar" />
                    ) : (
                      <div className="performer-avatar-placeholder">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="performer-name">{student.name}</span>
                  </div>
                  <span className="performer-value">{formatMinutes(student.minutes)}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Hourly Screen Time */}
        <div className="dashboard-card dept-screentime-card">
          <div className="card-header-with-badge">
            <h2 className="card-main-title">Today's Hourly Screen Time</h2>
            <span className="time-badge">24 Hours</span>
          </div>
          <ChartBar
            data={hourlyScreentime.map(item => ({
              range: item.hour,
              minutes: item.minutes,
            }))}
            dataKey="minutes"
            xAxisKey="range"
            fillColor="#2b8fa3"
          />
        </div>

        {/* Screen Time by Age Group */}
        <div className="dashboard-card year-level-card">
          <div className="card-header-with-badge">
            <h2 className="card-main-title">Screen Time by Age Group</h2>
            <span className="time-badge">Last 7 Days</span>
          </div>
          <div className="stacked-bar-list">
            {stats.screenTimeByAgeGroup.length > 0 ? (
              stats.screenTimeByAgeGroup.map((group, index) => {
                const opacities = [0.08, 0.12, 0.18, 0.25, 0.35, 0.45]
                return (
                  <div
                    key={group.ageGroup}
                    className="stacked-bar-item"
                    style={{ backgroundColor: `rgba(43, 143, 163, ${opacities[index] || 0.35})` }}
                  >
                    <div className="stacked-bar-indicator" style={{ backgroundColor: '#2b8fa3' }} />
                    <span className="stacked-bar-label" style={{ color: '#2b8fa3' }}>
                      {group.ageGroup} years
                    </span>
                    <span className="stacked-bar-value" style={{ color: '#2b8fa3' }}>
                      {formatMinutes(group.avgMinutes)} ({group.userCount} users)
                    </span>
                  </div>
                )
              })
            ) : (
              <p className="empty-state-subtext">No age data available</p>
            )}
          </div>
        </div>

        {/* Most Used Apps */}
        <div className="dashboard-card gender-card">
          <div className="card-header-with-badge">
            <h2 className="card-main-title">Most Used Apps</h2>
            <span className="time-badge">Last 7 Days</span>
          </div>
          <div className="top-performers-list scrollable" style={{ maxHeight: '320px' }}>
            {stats.mostUsedApps.length > 0 ? (
              stats.mostUsedApps.map((app, index) => (
                <div key={app.packageName} className="performer-item">
                  <div className="performer-info">
                    <div
                      className={`rank-badge ${index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'rank-default'}`}
                    >
                      {index + 1}
                    </div>
                    {app.appIcon ? (
                      <img
                        src={app.appIcon.startsWith('data:') ? app.appIcon : `data:image/png;base64,${app.appIcon}`}
                        alt={app.appName}
                        className="performer-avatar"
                        style={{ borderRadius: '8px' }}
                      />
                    ) : (
                      <div className="performer-avatar-placeholder" style={{ borderRadius: '8px' }}>
                        {app.appName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="performer-name">{app.appName}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>{app.userCount} users</span>
                    </div>
                  </div>
                  <span className="performer-value">{formatMinutes(app.totalMinutes)}</span>
                </div>
              ))
            ) : (
              <p className="empty-state-subtext" style={{ padding: '20px', textAlign: 'center' }}>No app usage data available</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
