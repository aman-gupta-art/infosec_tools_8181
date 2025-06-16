import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Add New Server',
      description: 'Register a new server in the inventory system',
      icon: 'Plus',
      color: 'primary',
      path: '/add-edit-server',
      shortcut: 'Ctrl+N'
    },
    {
      title: 'Import Data',
      description: 'Bulk import server data from Excel files',
      icon: 'Upload',
      color: 'accent',
      path: '/excel-import-export',
      shortcut: 'Ctrl+I'
    },
    {
      title: 'View Inventory',
      description: 'Browse and manage server inventory',
      icon: 'Database',
      color: 'success',
      path: '/server-inventory-management',
      shortcut: 'Ctrl+V'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: 'Users',
      color: 'warning',
      path: '/user-management-admin',
      shortcut: 'Ctrl+U',
      adminOnly: true
    }
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-primary',
      hover: 'hover:bg-primary-700',
      text: 'text-white'
    },
    accent: {
      bg: 'bg-accent',
      hover: 'hover:bg-accent-700',
      text: 'text-white'
    },
    success: {
      bg: 'bg-success',
      hover: 'hover:bg-success-700',
      text: 'text-white'
    },
    warning: {
      bg: 'bg-warning',
      hover: 'hover:bg-warning-700',
      text: 'text-white'
    }
  };

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-surface rounded-lg border border-default p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">
            Quick Actions
          </h2>
          <p className="text-sm text-text-secondary">
            Frequently used operations for efficient server management
          </p>
        </div>
        <Icon name="Zap" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const colorClass = colorClasses[action.color] || colorClasses.primary;
          
          return (
            <button
              key={index}
              onClick={() => handleActionClick(action.path)}
              className={`
                ${colorClass.bg} ${colorClass.hover} ${colorClass.text}
                p-6 rounded-lg transition-smooth text-left group
                hover:shadow-elevated hover:scale-105 transform
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Icon name={action.icon} size={20} className="text-white" />
                </div>
                {action.shortcut && (
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-white">
                    {action.shortcut}
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold mb-2 group-hover:text-white transition-colors">
                {action.title}
              </h3>
              
              <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                {action.description}
              </p>

              {action.adminOnly && (
                <div className="flex items-center mt-3 pt-3 border-t border-white border-opacity-20">
                  <Icon name="Shield" size={14} className="text-white mr-1" />
                  <span className="text-xs text-white opacity-75">Admin Only</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="mt-8 pt-6 border-t border-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">98.7%</div>
            <div className="text-sm text-text-secondary">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">156</div>
            <div className="text-sm text-text-secondary">Actions Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">12</div>
            <div className="text-sm text-text-secondary">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;