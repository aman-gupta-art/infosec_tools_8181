import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    // Debounce search to avoid too many calls
    const timeoutId = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search servers by IP, hostname, OS, application, owner, location..."
          className="block w-full pl-10 pr-12 py-3 border border-default rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
        
        {localQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={handleClearSearch}
              className="p-1 rounded-full hover:bg-secondary-100 transition-smooth"
              title="Clear search"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>
        )}
      </div>

      {/* Search suggestions or recent searches could be added here */}
      {localQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-default rounded-lg shadow-elevated z-10 max-h-60 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Info" size={14} />
              <span>
                Search across all server fields including IP, hostname, OS, applications, and more
              </span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;