import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ChartCard = ({ title, subtitle, children, onExport = null }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      console.log(`Exporting chart: ${title}`);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`
      bg-surface rounded-lg border border-default shadow-card hover:shadow-elevated transition-smooth
      ${isFullscreen ? 'fixed inset-4 z-50' : ''}
    `}>
      <div className="flex items-center justify-between p-6 border-b border-light">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            title="Export Chart"
          >
            <Icon name="Download" size={16} className="text-text-secondary" />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Icon 
              name={isFullscreen ? "Minimize2" : "Maximize2"} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>
        </div>
      </div>
      
      <div className={`p-6 ${isFullscreen ? 'h-full overflow-auto' : ''}`}>
        {children}
      </div>
      
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleFullscreen}
        />
      )}
    </div>
  );
};

export default ChartCard;