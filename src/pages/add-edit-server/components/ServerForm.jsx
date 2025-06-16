import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ServerForm = ({ initialData, isEditing, onSave, onSaveAndAddAnother, onCancel }) => {
  const [formData, setFormData] = useState({
    serverIp: '',
    hostname: '',
    operatingSystem: '',
    serverRole: '',
    serverType: '',
    applicationName: '',
    applicationSpoc: '',
    applicationOwner: '',
    platform: '',
    location: '',
    manufacturer: '',
    ram: '',
    cpu: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock dropdown options
  const dropdownOptions = {
    operatingSystem: [
      'Windows Server 2019',
      'Windows Server 2022',
      'Ubuntu 20.04 LTS',
      'Ubuntu 22.04 LTS',
      'CentOS 7',
      'CentOS 8',
      'Red Hat Enterprise Linux 8',
      'Red Hat Enterprise Linux 9',
      'SUSE Linux Enterprise Server',
      'Debian 11',
      'VMware ESXi 7.0'
    ],
    serverRole: [
      'Web Server',
      'Database Server',
      'Application Server',
      'File Server',
      'Domain Controller',
      'Mail Server',
      'DNS Server',
      'DHCP Server',
      'Backup Server',
      'Monitoring Server',
      'Load Balancer',
      'Firewall'
    ],
    serverType: [
      'Physical',
      'Virtual Machine',
      'Container',
      'Cloud Instance'
    ],
    platform: [
      'On-Premises',
      'AWS',
      'Microsoft Azure',
      'Google Cloud Platform',
      'VMware vSphere',
      'Hyper-V',
      'Docker',
      'Kubernetes'
    ],
    location: [
      'Data Center - Primary',
      'Data Center - Secondary',
      'AWS US-East-1',
      'AWS US-West-2',
      'Azure East US',
      'Azure West Europe',
      'GCP US-Central1',
      'Office - New York',
      'Office - London',
      'Office - Singapore'
    ],
    manufacturer: [
      'Dell Technologies',
      'HPE (Hewlett Packard Enterprise)',
      'Lenovo',
      'Cisco',
      'IBM',
      'Supermicro',
      'Fujitsu',
      'Oracle',
      'VMware',
      'Microsoft'
    ]
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    const requiredFields = [
      'serverIp', 'hostname', 'operatingSystem', 'serverRole', 
      'serverType', 'applicationName', 'applicationOwner', 'platform', 'location'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // IP address validation
    if (formData.serverIp) {
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(formData.serverIp)) {
        newErrors.serverIp = 'Please enter a valid IP address';
      }
    }

    // Email validation for SPOC
    if (formData.applicationSpoc) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.applicationSpoc)) {
        newErrors.applicationSpoc = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (saveType) => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (saveType === 'saveAndAdd') {
        await onSaveAndAddAnother(formData);
      } else {
        await onSave(formData);
      }
    } catch (error) {
      console.error('Error saving server:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (field, label, type = 'text', placeholder = '', required = false) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border rounded-lg transition-smooth
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${errors[field] 
            ? 'border-error bg-error-50' :'border-secondary-300 bg-surface hover:border-secondary-400'
          }
        `}
      />
      {errors[field] && (
        <p className="text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  const renderSelect = (field, label, options, required = false) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <select
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`
          w-full px-3 py-2 border rounded-lg transition-smooth
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${errors[field] 
            ? 'border-error bg-error-50' :'border-secondary-300 bg-surface hover:border-secondary-400'
          }
        `}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[field] && (
        <p className="text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <form className="space-y-8">
      {/* Server Identity Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-light">
          <Icon name="Network" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Server Identity</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderInput('serverIp', 'Server IP Address', 'text', '192.168.1.100', true)}
          {renderInput('hostname', 'Hostname', 'text', 'web-server-01', true)}
        </div>
      </div>

      {/* System Configuration Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-light">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">System Configuration</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSelect('operatingSystem', 'Operating System', dropdownOptions.operatingSystem, true)}
          {renderSelect('serverRole', 'Server Role', dropdownOptions.serverRole, true)}
          {renderSelect('serverType', 'Server Type', dropdownOptions.serverType, true)}
        </div>
      </div>

      {/* Application Details Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-light">
          <Icon name="Package" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Application Details</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderInput('applicationName', 'Application Name', 'text', 'Customer Portal', true)}
          {renderInput('applicationSpoc', 'Application SPOC', 'email', 'spoc@company.com')}
          {renderInput('applicationOwner', 'Application Owner', 'text', 'John Doe', true)}
        </div>
      </div>

      {/* Infrastructure Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-light">
          <Icon name="Building" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Infrastructure</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSelect('platform', 'Platform', dropdownOptions.platform, true)}
          {renderSelect('location', 'Location', dropdownOptions.location, true)}
        </div>
      </div>

      {/* Hardware Specifications Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-light">
          <Icon name="Cpu" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Hardware Specifications</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSelect('manufacturer', 'Manufacturer', dropdownOptions.manufacturer)}
          {renderInput('ram', 'RAM', 'text', '16GB')}
          {renderInput('cpu', 'CPU', 'text', 'Intel Xeon E5-2680 v4')}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-light">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-secondary-300 text-text-secondary rounded-lg hover:bg-secondary-50 transition-smooth flex items-center justify-center"
        >
          <Icon name="X" size={18} className="mr-2" />
          Cancel
        </button>
        
        {!isEditing && (
          <button
            type="button"
            onClick={() => handleSubmit('saveAndAdd')}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 transition-smooth flex items-center justify-center"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save & Add Another'}
          </button>
        )}
        
        <button
          type="button"
          onClick={() => handleSubmit('save')}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-smooth flex items-center justify-center"
        >
          <Icon name="Save" size={18} className="mr-2" />
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Server' : 'Save Server')}
        </button>
      </div>
    </form>
  );
};

export default ServerForm;