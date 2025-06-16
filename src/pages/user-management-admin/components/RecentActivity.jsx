import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'user_created',
      message: 'New user account created',
      details: 'lisa_readonly added by John Doe',
      timestamp: new Date('2024-01-15T14:30:00'),
      icon: 'UserPlus',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'user_updated',
      message: 'User role updated',
      details: 'mike_security role changed from User to Admin',
      timestamp: new Date('2024-01-15T12:15:00'),
      icon: 'Shield',
      iconColor: 'text-warning'
    },
    {
      id: 3,
      type: 'user_deactivated',
      message: 'User account deactivated',
      details: 'temp_user01 deactivated by Sarah Wilson',
      timestamp: new Date('2024-01-15T10:45:00'),
      icon: 'UserX',
      iconColor: 'text-error'
    },
    {
      id: 4,
      type: 'password_reset',
      message: 'Password reset requested',
      details: 'david_ops requested password reset',
      timestamp: new Date('2024-01-14T16:20:00'),
      icon: 'Key',
      iconColor: 'text-accent'
    },
    {
      id: 5,
      type: 'user_login',
      message: 'Failed login attempt',
      details: 'Multiple failed attempts for admin_john',
      timestamp: new Date('2024-01-14T09:30:00'),
      icon: 'AlertTriangle',
      iconColor: 'text-error'
    },
    {
      id: 6,
      type: 'user_created',
      message: 'Bulk user import',
      details: '5 users imported from Excel file',
      timestamp: new Date('2024-01-13T15:10:00'),
      icon: 'Upload',
      iconColor: 'text-primary'
    }
  ];

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  const getActivityTypeLabel = (type) => {
    const labels = {
      user_created: 'User Created',
      user_updated: 'User Updated',
      user_deactivated: 'User Deactivated',
      password_reset: 'Password Reset',
      user_login: 'Login Activity',
      bulk_import: 'Bulk Import'
    };
    return labels[type] || 'Activity';
  };

  return (
    <div className="bg-surface rounded-lg border border-default">
      {/* Header */}
      <div className="px-6 py-4 border-b border-default">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">
            Recent Activity
          </h3>
          <button className="text-sm text-primary hover:text-primary-700 transition-smooth">
            View All
          </button>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Latest user management activities
        </p>
      </div>

      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className={`px-6 py-4 ${index !== activities.length - 1 ? 'border-b border-light' : ''} hover:bg-secondary-50 transition-smooth`}
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Icon 
                    name={activity.icon} 
                    size={16} 
                    className={activity.iconColor}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.message}
                  </p>
                  <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {activity.details}
                </p>
                <div className="flex items-center mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                    {getActivityTypeLabel(activity.type)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-default bg-secondary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-text-secondary">
            <Icon name="Clock" size={16} className="mr-2" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button className="text-sm text-primary hover:text-primary-700 transition-smooth flex items-center">
            <Icon name="RefreshCw" size={16} className="mr-1" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;