// src/pages/dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import QuickActions from './components/QuickActions';
import useTheme from 'hooks/useTheme';
import useSidebar from 'hooks/useSidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar } = useSidebar();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [timePeriod, setTimePeriod] = useState('7d');

  // Mock user data
  const currentUser = {
    name: "John Anderson",
    email: "john.anderson@infosec.com",
    role: "admin"
  };

  // Mock server data
  const serverStats = {
    total: 1247,
    live: 1156,
    shutdown: 67,
    newlyAdded: 24
  };

  const applicationOwnerData = [
    { name: 'IT Operations', value: 342, color: '#1E40AF' },
    { name: 'Development', value: 298, color: '#0EA5E9' },
    { name: 'Security', value: 187, color: '#059669' },
    { name: 'Analytics', value: 156, color: '#D97706' },
    { name: 'Marketing', value: 134, color: '#DC2626' },
    { name: 'Finance', value: 89, color: '#7C3AED' },
    { name: 'HR', value: 41, color: '#EC4899' }
  ];

  const locationData = [
    { name: 'US East', value: 423, color: '#1E40AF' },
    { name: 'US West', value: 387, color: '#0EA5E9' },
    { name: 'Europe', value: 234, color: '#059669' },
    { name: 'Asia Pacific', value: 156, color: '#D97706' },
    { name: 'Canada', value: 47, color: '#DC2626' }
  ];

  const applicationNameData = [
    { name: 'Web Portal', count: 156 },
    { name: 'API Gateway', count: 134 },
    { name: 'Database', count: 123 },
    { name: 'Analytics', count: 98 },
    { name: 'Monitoring', count: 87 },
    { name: 'Security', count: 76 },
    { name: 'Backup', count: 65 },
    { name: 'Load Balancer', count: 54 }
  ];

  const operatingSystemData = [
    { name: 'Ubuntu 20.04', count: 387 },
    { name: 'CentOS 8', count: 298 },
    { name: 'Windows Server 2019', count: 234 },
    { name: 'RHEL 8', count: 156 },
    { name: 'Debian 11', count: 98 },
    { name: 'Windows Server 2022', count: 74 }
  ];

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-default rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-primary">
            Count: <span className="font-semibold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-default rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-primary">
            Servers: <span className="font-semibold">{data.value}</span>
          </p>
          <p className="text-xs text-text-secondary">
            {((data.value / serverStats.total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={isCollapsed}
        mobileOpen={isMobileOpen}
        onToggle={toggleSidebar}
        onCloseMobile={closeMobileSidebar}
        userRole={currentUser.role}
      />
      
      <Header 
        user={currentUser}
        onLogout={handleLogout}
        onThemeToggle={toggleTheme}
        themeMode={theme}
        sidebarCollapsed={isCollapsed}
        onSidebarToggle={toggleSidebar}
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-16
        ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <Breadcrumb />
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Infrastructure Dashboard
                </h1>
                <p className="text-text-secondary">
                  Monitor and manage your server infrastructure with real-time insights
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                {/* Time Period Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">Period:</span>
                  <select
                    value={timePeriod}
                    onChange={(e) => handleTimePeriodChange(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-default rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleManualRefresh}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="text-sm">Refresh</span>
                </button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Last updated: {formatTime(lastRefresh)}
              </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Total Servers"
                value={serverStats.total}
                icon="Server"
                color="primary"
                trend={{ value: 12, isPositive: true }}
              />
              <KPICard
                title="Live Servers"
                value={serverStats.live}
                icon="CheckCircle"
                color="success"
                trend={{ value: 8, isPositive: true }}
              />
              <KPICard
                title="Shutdown Servers"
                value={serverStats.shutdown}
                icon="XCircle"
                color="error"
                trend={{ value: 3, isPositive: false }}
              />
              <KPICard
                title="Newly Added"
                value={serverStats.newlyAdded}
                icon="Plus"
                color="accent"
                trend={{ value: 24, isPositive: true }}
                subtitle={`in last ${timePeriod === '24h' ? '24 hours' : timePeriod === '7d' ? '7 days' : timePeriod === '30d' ? '30 days' : '90 days'}`}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              {/* Pie Charts Column */}
              <div className="space-y-8">
                {/* Application Owner Distribution */}
                <ChartCard
                  title="Server Distribution by Application Owner"
                  subtitle="Distribution of servers across different application owners"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={applicationOwnerData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {applicationOwnerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Location Distribution */}
                <ChartCard
                  title="Server Distribution by Location"
                  subtitle="Geographic distribution of server infrastructure"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={locationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Bar Charts Column */}
              <div className="space-y-8">
                {/* Application Name Distribution */}
                <ChartCard
                  title="Server Count by Application Name"
                  subtitle="Number of servers per application type"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={applicationNameData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Operating System Distribution */}
                <ChartCard
                  title="Server Count by Operating System"
                  subtitle="Distribution of servers across different OS versions"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={operatingSystemData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;