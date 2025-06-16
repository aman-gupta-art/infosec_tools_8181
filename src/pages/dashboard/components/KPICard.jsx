import React from 'react';
import Icon from 'components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  trend = null, 
  subtitle = null 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary',
      value: 'text-text-primary'
    },
    success: {
      bg: 'bg-success-50',
      icon: 'text-success',
      value: 'text-text-primary'
    },
    error: {
      bg: 'bg-error-50',
      icon: 'text-error',
      value: 'text-text-primary'
    },
    accent: {
      bg: 'bg-accent-50',
      icon: 'text-accent',
      value: 'text-text-primary'
    },
    warning: {
      bg: 'bg-warning-50',
      icon: 'text-warning',
      value: 'text-text-primary'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.primary;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-surface rounded-lg border border-default p-6 shadow-card hover:shadow-elevated transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${currentColor.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={currentColor.icon} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend.isPositive 
              ? 'bg-success-50 text-success' :'bg-error-50 text-error'
          }`}>
            <Icon 
              name={trend.isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
            />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-text-secondary">
          {title}
        </h3>
        <p className={`text-3xl font-bold ${currentColor.value}`}>
          {formatNumber(value)}
        </p>
        {subtitle && (
          <p className="text-xs text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default KPICard;