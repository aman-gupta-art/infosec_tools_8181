import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';

const ExcelImportExport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // State management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('import');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const [importMode, setImportMode] = useState('append');
  const [exportFilters, setExportFilters] = useState({
    format: 'excel',
    dateRange: 'all',
    fields: {
      serverIp: true,
      hostname: true,
      operatingSystem: true,
      serverRole: true,
      serverType: true,
      applicationName: true,
      applicationSpoc: true,
      applicationOwner: true,
      platform: true,
      location: true,
      manufacturer: true,
      ram: true,
      cpu: true
    }
  });

  // Mock data
  const mockUser = {
    name: "Admin User",
    email: "admin@infosectools.com",
    role: "admin"
  };

  const mockValidationData = [
    {
      row: 1,
      serverIp: "192.168.1.100",
      hostname: "web-server-01",
      status: "valid",
      errors: []
    },
    {
      row: 2,
      serverIp: "192.168.1.101",
      hostname: "db-server-01",
      status: "valid",
      errors: []
    },
    {
      row: 3,
      serverIp: "invalid-ip",
      hostname: "app-server-01",
      status: "error",
      errors: ["Invalid IP address format"]
    },
    {
      row: 4,
      serverIp: "192.168.1.103",
      hostname: "",
      status: "warning",
      errors: ["Hostname is empty"]
    }
  ];

  const mockExportHistory = [
    {
      id: 1,
      filename: "server_inventory_2024_01_15.xlsx",
      timestamp: new Date(Date.now() - 86400000),
      recordCount: 245,
      format: "Excel"
    },
    {
      id: 2,
      filename: "filtered_servers_2024_01_10.csv",
      timestamp: new Date(Date.now() - 432000000),
      recordCount: 89,
      format: "CSV"
    },
    {
      id: 3,
      filename: "complete_inventory_2024_01_05.xlsx",
      timestamp: new Date(Date.now() - 864000000),
      recordCount: 312,
      format: "Excel"
    }
  ];

  // Event handlers
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      alert('Please select a valid Excel or CSV file');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setImportProgress(0);

    // Simulate file processing
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setValidationResults({
            totalRows: 4,
            validRows: 2,
            errorRows: 1,
            warningRows: 1,
            data: mockValidationData
          });
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const handleImport = () => {
    if (!validationResults) return;
    
    setIsProcessing(true);
    
    // Simulate import process
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Successfully imported ${validationResults.validRows} records using ${importMode} mode`);
      setUploadedFile(null);
      setValidationResults(null);
      setImportProgress(0);
    }, 2000);
  };

  const handleExport = () => {
    const selectedFields = Object.entries(exportFilters.fields)
      .filter(([_, selected]) => selected)
      .map(([field, _]) => field);
    
    if (selectedFields.length === 0) {
      alert('Please select at least one field to export');
      return;
    }

    // Simulate export process
    const filename = `server_export_${new Date().toISOString().split('T')[0]}.${exportFilters.format === 'excel' ? 'xlsx' : 'csv'}`;
    alert(`Exporting data to ${filename} with ${selectedFields.length} fields`);
  };

  const handleDownloadTemplate = () => {
    alert('Downloading Excel template with required columns');
  };

  const handleDownloadErrorLog = () => {
    if (validationResults && validationResults.errorRows > 0) {
      alert('Downloading error log with validation details');
    }
  };

  const fieldLabels = {
    serverIp: 'Server IP',
    hostname: 'Hostname',
    operatingSystem: 'Operating System',
    serverRole: 'Server Role',
    serverType: 'Server Type',
    applicationName: 'Application Name',
    applicationSpoc: 'Application SPOC',
    applicationOwner: 'Application Owner',
    platform: 'Platform',
    location: 'Location',
    manufacturer: 'Manufacturer',
    ram: 'RAM',
    cpu: 'CPU'
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
        userRole={mockUser.role}
      />
      
      <Header 
        user={mockUser}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
      `}>
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Excel Import/Export
            </h1>
            <p className="text-text-secondary">
              Manage server inventory data through bulk import and export operations
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface rounded-lg shadow-card border border-default">
            <div className="border-b border-light">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('import')}
                  className={`
                    px-6 py-4 text-sm font-medium border-b-2 transition-smooth
                    ${activeTab === 'import' ?'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }
                  `}
                >
                  <Icon name="Upload" size={16} className="mr-2 inline" />
                  Import Data
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`
                    px-6 py-4 text-sm font-medium border-b-2 transition-smooth
                    ${activeTab === 'export'
                      ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }
                  `}
                >
                  <Icon name="Download" size={16} className="mr-2 inline" />
                  Export Data
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'import' && (
                <div className="space-y-6">
                  {/* Template Download */}
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon name="Info" size={20} className="text-accent mr-3 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-accent-700 mb-1">
                          Download Template First
                        </h3>
                        <p className="text-sm text-accent-600 mb-3">
                          Use our Excel template to ensure proper data formatting and avoid import errors.
                        </p>
                        <button
                          onClick={handleDownloadTemplate}
                          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-smooth flex items-center"
                        >
                          <Icon name="FileSpreadsheet" size={16} className="mr-2" />
                          Download Template
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition-smooth
                      ${dragActive 
                        ? 'border-primary bg-primary-50' :'border-secondary-300 hover:border-secondary-400'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Upload" size={32} className="text-secondary-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-2">
                          Drop your file here or click to browse
                        </h3>
                        <p className="text-text-secondary mb-4">
                          Supports Excel (.xlsx, .xls) and CSV files up to 10MB
                        </p>
                        
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth"
                        >
                          Select File
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isProcessing && (
                    <div className="bg-surface border border-default rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-text-primary">
                          Processing: {uploadedFile?.name}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {importProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${importProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Validation Results */}
                  {validationResults && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-surface border border-default rounded-lg p-4">
                          <div className="text-2xl font-bold text-text-primary">
                            {validationResults.totalRows}
                          </div>
                          <div className="text-sm text-text-secondary">Total Records</div>
                        </div>
                        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                          <div className="text-2xl font-bold text-success">
                            {validationResults.validRows}
                          </div>
                          <div className="text-sm text-success-600">Valid Records</div>
                        </div>
                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                          <div className="text-2xl font-bold text-warning">
                            {validationResults.warningRows}
                          </div>
                          <div className="text-sm text-warning-600">Warnings</div>
                        </div>
                        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                          <div className="text-2xl font-bold text-error">
                            {validationResults.errorRows}
                          </div>
                          <div className="text-sm text-error-600">Errors</div>
                        </div>
                      </div>

                      {/* Validation Preview Table */}
                      <div className="bg-surface border border-default rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-light flex items-center justify-between">
                          <h3 className="font-medium text-text-primary">Validation Preview</h3>
                          {validationResults.errorRows > 0 && (
                            <button
                              onClick={handleDownloadErrorLog}
                              className="text-error hover:text-error-600 text-sm font-medium flex items-center"
                            >
                              <Icon name="Download" size={16} className="mr-1" />
                              Download Error Log
                            </button>
                          )}
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-secondary-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                  Row
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                  Server IP
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                  Hostname
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                  Issues
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-light">
                              {validationResults.data.map((row) => (
                                <tr key={row.row} className="hover:bg-secondary-50">
                                  <td className="px-4 py-3 text-sm text-text-primary">
                                    {row.row}
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`
                                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${row.status === 'valid' ? 'bg-success-100 text-success-800' : ''}
                                      ${row.status === 'warning' ? 'bg-warning-100 text-warning-800' : ''}
                                      ${row.status === 'error' ? 'bg-error-100 text-error-800' : ''}
                                    `}>
                                      <Icon 
                                        name={
                                          row.status === 'valid' ? 'CheckCircle' :
                                          row.status === 'warning' ? 'AlertTriangle' : 'XCircle'
                                        } 
                                        size={12} 
                                        className="mr-1" 
                                      />
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-text-primary">
                                    {row.serverIp}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-text-primary">
                                    {row.hostname || '-'}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-text-secondary">
                                    {row.errors.length > 0 ? row.errors.join(', ') : '-'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Import Options */}
                      <div className="bg-surface border border-default rounded-lg p-4">
                        <h3 className="font-medium text-text-primary mb-4">Import Options</h3>
                        <div className="space-y-3">
                          <label className="flex items-start">
                            <input
                              type="radio"
                              name="importMode"
                              value="append"
                              checked={importMode === 'append'}
                              onChange={(e) => setImportMode(e.target.value)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium text-text-primary">Append New Records</div>
                              <div className="text-sm text-text-secondary">Add new records without affecting existing data</div>
                            </div>
                          </label>
                          <label className="flex items-start">
                            <input
                              type="radio"
                              name="importMode"
                              value="update"
                              checked={importMode === 'update'}
                              onChange={(e) => setImportMode(e.target.value)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium text-text-primary">Update Existing Records</div>
                              <div className="text-sm text-text-secondary">Update records based on Server IP matching</div>
                            </div>
                          </label>
                          <label className="flex items-start">
                            <input
                              type="radio"
                              name="importMode"
                              value="replace"
                              checked={importMode === 'replace'}
                              onChange={(e) => setImportMode(e.target.value)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium text-text-primary">Replace All Data</div>
                              <div className="text-sm text-error">⚠️ This will delete all existing records and replace with imported data</div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Import Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleImport}
                          disabled={validationResults.errorRows > 0}
                          className={`
                            px-6 py-2 rounded-lg font-medium transition-smooth flex items-center
                            ${validationResults.errorRows > 0
                              ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed' :'bg-primary text-white hover:bg-primary-700'
                            }
                          `}
                        >
                          <Icon name="Upload" size={16} className="mr-2" />
                          Import {validationResults.validRows} Records
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'export' && (
                <div className="space-y-6">
                  {/* Export Filters */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Format Selection */}
                    <div className="bg-surface border border-default rounded-lg p-4">
                      <h3 className="font-medium text-text-primary mb-4">Export Format</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="format"
                            value="excel"
                            checked={exportFilters.format === 'excel'}
                            onChange={(e) => setExportFilters(prev => ({ ...prev, format: e.target.value }))}
                            className="mr-3"
                          />
                          <Icon name="FileSpreadsheet" size={16} className="mr-2 text-success" />
                          <span className="text-text-primary">Excel (.xlsx)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="format"
                            value="csv"
                            checked={exportFilters.format === 'csv'}
                            onChange={(e) => setExportFilters(prev => ({ ...prev, format: e.target.value }))}
                            className="mr-3"
                          />
                          <Icon name="FileText" size={16} className="mr-2 text-primary" />
                          <span className="text-text-primary">CSV (.csv)</span>
                        </label>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="bg-surface border border-default rounded-lg p-4">
                      <h3 className="font-medium text-text-primary mb-4">Date Range</h3>
                      <select
                        value={exportFilters.dateRange}
                        onChange={(e) => setExportFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                        className="w-full px-3 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="all">All Records</option>
                        <option value="last7days">Last 7 Days</option>
                        <option value="last30days">Last 30 Days</option>
                        <option value="last90days">Last 90 Days</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>

                  {/* Field Selection */}
                  <div className="bg-surface border border-default rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-text-primary">Select Fields to Export</h3>
                      <div className="space-x-2">
                        <button
                          onClick={() => setExportFilters(prev => ({
                            ...prev,
                            fields: Object.keys(prev.fields).reduce((acc, key) => ({ ...acc, [key]: true }), {})
                          }))}
                          className="text-primary hover:text-primary-700 text-sm font-medium"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => setExportFilters(prev => ({
                            ...prev,
                            fields: Object.keys(prev.fields).reduce((acc, key) => ({ ...acc, [key]: false }), {})
                          }))}
                          className="text-text-secondary hover:text-text-primary text-sm font-medium"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(exportFilters.fields).map(([field, selected]) => (
                        <label key={field} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={(e) => setExportFilters(prev => ({
                              ...prev,
                              fields: { ...prev.fields, [field]: e.target.checked }
                            }))}
                            className="mr-3"
                          />
                          <span className="text-text-primary text-sm">{fieldLabels[field]}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Export Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleExport}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center"
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Export Data
                    </button>
                  </div>

                  {/* Export History */}
                  <div className="bg-surface border border-default rounded-lg">
                    <div className="px-4 py-3 border-b border-light">
                      <h3 className="font-medium text-text-primary">Recent Exports</h3>
                    </div>
                    <div className="divide-y divide-light">
                      {mockExportHistory.map((export_item) => (
                        <div key={export_item.id} className="px-4 py-3 flex items-center justify-between hover:bg-secondary-50">
                          <div className="flex items-center">
                            <Icon 
                              name={export_item.format === 'Excel' ? 'FileSpreadsheet' : 'FileText'} 
                              size={16} 
                              className={`mr-3 ${export_item.format === 'Excel' ? 'text-success' : 'text-primary'}`}
                            />
                            <div>
                              <div className="font-medium text-text-primary text-sm">
                                {export_item.filename}
                              </div>
                              <div className="text-xs text-text-secondary">
                                {export_item.recordCount} records • {export_item.timestamp.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <button className="text-primary hover:text-primary-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExcelImportExport;