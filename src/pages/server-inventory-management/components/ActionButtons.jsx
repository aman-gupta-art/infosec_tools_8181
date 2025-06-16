import React from 'react';
import Icon from 'components/AppIcon';

const ActionButtons = ({ onAddServer, onImportExcel, onExportData }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={onAddServer}
        className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-smooth"
      >
        <Icon name="Plus" size={18} />
        <span>Add Server</span>
      </button>
      
      <button
        onClick={onImportExcel}
        className="flex items-center justify-center space-x-2 bg-success text-white px-4 py-2.5 rounded-lg font-medium hover:bg-success-600 transition-smooth"
      >
        <Icon name="Upload" size={18} />
        <span>Import Excel</span>
      </button>
      
      <button
        onClick={onExportData}
        className="flex items-center justify-center space-x-2 bg-accent text-white px-4 py-2.5 rounded-lg font-medium hover:bg-accent-600 transition-smooth"
      >
        <Icon name="Download" size={18} />
        <span>Export Data</span>
      </button>
    </div>
  );
};

export default ActionButtons;