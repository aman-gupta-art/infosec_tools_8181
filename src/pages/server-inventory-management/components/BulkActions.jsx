import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const bulkActions = [
    {
      key: 'export',
      label: 'Export Selected',
      icon: 'Download',
      color: 'text-accent hover:bg-accent-50'
    },
    {
      key: 'shutdown',
      label: 'Shutdown Servers',
      icon: 'Power',
      color: 'text-warning hover:bg-warning-50'
    },
    {
      key: 'delete',
      label: 'Delete Selected',
      icon: 'Trash2',
      color: 'text-error hover:bg-error-50'
    }
  ];

  const handleActionClick = (action) => {
    onBulkAction(action);
    setIsOpen(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">
              {selectedCount} server{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <button
            onClick={() => handleActionClick('export')}
            className="flex items-center space-x-1 px-3 py-1.5 bg-accent text-white rounded-md text-sm hover:bg-accent-600 transition-smooth"
          >
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary rounded-md text-sm hover:bg-secondary-200 transition-smooth"
            >
              <span>More Actions</span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-default py-2 z-20">
                {bulkActions.map((action) => (
                  <button
                    key={action.key}
                    onClick={() => handleActionClick(action.key)}
                    className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-smooth ${action.color}`}
                  >
                    <Icon name={action.icon} size={16} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Selection */}
          <button
            onClick={() => onBulkAction('clear')}
            className="p-1.5 rounded-md hover:bg-secondary-100 transition-smooth"
            title="Clear selection"
          >
            <Icon name="X" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Bulk Action Confirmation */}
      <div className="mt-3 text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Available actions:</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>Export</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Power" size={12} />
              <span>Shutdown</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Trash2" size={12} />
              <span>Delete</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;