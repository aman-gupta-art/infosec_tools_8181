import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, servers }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Extract unique values from servers for filter options
  const getUniqueValues = (key) => {
    return [...new Set(servers.map(server => server[key]))].sort();
  };

  const filterCategories = [
    {
      title: 'Infrastructure',
      icon: 'Server',
      filters: [
        {
          key: 'operatingSystem',
          label: 'Operating System',
          options: getUniqueValues('operatingSystem')
        },
        {
          key: 'serverType',
          label: 'Server Type',
          options: getUniqueValues('serverType')
        }
      ]
    },
    {
      title: 'Application',
      icon: 'Layers',
      filters: [
        {
          key: 'applicationOwner',
          label: 'Application Owner',
          options: getUniqueValues('applicationOwner')
        }
      ]
    },
    {
      title: 'Physical',
      icon: 'HardDrive',
      filters: [
        {
          key: 'location',
          label: 'Location',
          options: getUniqueValues('location')
        },
        {
          key: 'manufacturer',
          label: 'Manufacturer',
          options: getUniqueValues('manufacturer')
        }
      ]
    },
    {
      title: 'Status',
      icon: 'Activity',
      filters: [
        {
          key: 'status',
          label: 'Server Status',
          options: getUniqueValues('status')
        }
      ]
    }
  ];

  const handleFilterToggle = (filterKey, value) => {
    const currentValues = localFilters[filterKey] || [];
    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    setLocalFilters({
      ...localFilters,
      [filterKey]: newValues
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getTotalActiveFilters = () => {
    return Object.values(localFilters).reduce((acc, arr) => acc + arr.length, 0);
  };

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className={`
        fixed left-0 top-16 h-full bg-surface border-r border-default z-50
        transition-all duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'}
        lg:${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              {getTotalActiveFilters() > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {getTotalActiveFilters()}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-secondary-100 transition-smooth"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Filter Categories */}
          <div className="space-y-6">
            {filterCategories.map((category) => (
              <div key={category.title} className="border-b border-secondary-200 pb-6 last:border-b-0">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name={category.icon} size={16} className="text-text-secondary" />
                  <h4 className="font-medium text-text-primary">{category.title}</h4>
                </div>

                <div className="space-y-4">
                  {category.filters.map((filter) => (
                    <div key={filter.key}>
                      <h5 className="text-sm font-medium text-text-secondary mb-2">
                        {filter.label}
                      </h5>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {filter.options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-secondary-50 p-1 rounded transition-smooth"
                          >
                            <input
                              type="checkbox"
                              checked={localFilters[filter.key]?.includes(option) || false}
                              onChange={() => handleFilterToggle(filter.key, option)}
                              className="rounded border-secondary-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-text-primary">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-surface pt-4 border-t border-secondary-200 mt-6">
            <div className="flex space-x-3">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-default rounded-lg font-medium text-text-secondary hover:bg-secondary-50 transition-smooth"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            <div className="inline-block align-bottom bg-surface rounded-lg text-left overflow-hidden shadow-modal transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-surface px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Filter" size={20} className="text-primary" />
                    <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
                    {getTotalActiveFilters() > 0 && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {getTotalActiveFilters()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-secondary-100 transition-smooth"
                  >
                    <Icon name="X" size={18} />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-4">
                  {filterCategories.map((category) => (
                    <div key={category.title} className="border-b border-secondary-200 pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon name={category.icon} size={16} className="text-text-secondary" />
                        <h4 className="font-medium text-text-primary">{category.title}</h4>
                      </div>

                      <div className="space-y-3">
                        {category.filters.map((filter) => (
                          <div key={filter.key}>
                            <h5 className="text-sm font-medium text-text-secondary mb-2">
                              {filter.label}
                            </h5>
                            <div className="space-y-1">
                              {filter.options.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer hover:bg-secondary-50 p-1 rounded transition-smooth"
                                >
                                  <input
                                    type="checkbox"
                                    checked={localFilters[filter.key]?.includes(option) || false}
                                    onChange={() => handleFilterToggle(filter.key, option)}
                                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                                  />
                                  <span className="text-sm text-text-primary">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleApplyFilters}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm transition-smooth"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-surface text-base font-medium text-text-secondary hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-smooth"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;