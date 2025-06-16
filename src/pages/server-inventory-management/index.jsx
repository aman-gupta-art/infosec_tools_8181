// src/pages/server-inventory-management/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import ServerTable from './components/ServerTable';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import ActionButtons from './components/ActionButtons';
import BulkActions from './components/BulkActions';
import Icon from 'components/AppIcon';
import useTheme from 'hooks/useTheme';
import useSidebar from 'hooks/useSidebar';

const ServerInventoryManagement = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar } = useSidebar();
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedServers, setSelectedServers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    operatingSystem: [],
    location: [],
    manufacturer: [],
    applicationOwner: [],
    serverType: [],
    status: []
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'hostname',
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Mock server data
  const mockServers = [
    {
      id: 1,
      serverIp: "192.168.1.10",
      hostname: "web-server-01",
      operatingSystem: "Ubuntu 20.04 LTS",
      serverRole: "Web Server",
      serverType: "Virtual",
      applicationName: "E-Commerce Platform",
      applicationSpoc: "john.doe@company.com",
      applicationOwner: "Marketing Team",
      platform: "Linux",
      location: "Data Center A",
      manufacturer: "VMware",
      ram: "16 GB",
      cpu: "4 vCPU",
      status: "Live",
      lastUpdated: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      serverIp: "192.168.1.11",
      hostname: "db-server-01",
      operatingSystem: "Windows Server 2019",
      serverRole: "Database Server",
      serverType: "Physical",
      applicationName: "Customer Management System",
      applicationSpoc: "jane.smith@company.com",
      applicationOwner: "IT Department",
      platform: "Windows",
      location: "Data Center B",
      manufacturer: "Dell",
      ram: "32 GB",
      cpu: "8 Core Intel Xeon",
      status: "Live",
      lastUpdated: "2024-01-14T15:45:00Z"
    },
    {
      id: 3,
      serverIp: "192.168.1.12",
      hostname: "app-server-01",
      operatingSystem: "CentOS 8",
      serverRole: "Application Server",
      serverType: "Virtual",
      applicationName: "HR Management Portal",
      applicationSpoc: "mike.johnson@company.com",
      applicationOwner: "Human Resources",
      platform: "Linux",
      location: "Data Center A",
      manufacturer: "VMware",
      ram: "24 GB",
      cpu: "6 vCPU",
      status: "Shutdown",
      lastUpdated: "2024-01-13T09:20:00Z"
    },
    {
      id: 4,
      serverIp: "192.168.1.13",
      hostname: "backup-server-01",
      operatingSystem: "Ubuntu 22.04 LTS",
      serverRole: "Backup Server",
      serverType: "Physical",
      applicationName: "Backup & Recovery System",
      applicationSpoc: "sarah.wilson@company.com",
      applicationOwner: "IT Operations",
      platform: "Linux",
      location: "Data Center C",
      manufacturer: "HP",
      ram: "64 GB",
      cpu: "12 Core AMD EPYC",
      status: "Live",
      lastUpdated: "2024-01-16T11:15:00Z"
    },
    {
      id: 5,
      serverIp: "192.168.1.14",
      hostname: "test-server-01",
      operatingSystem: "Windows Server 2022",
      serverRole: "Test Server",
      serverType: "Virtual",
      applicationName: "Development Environment",
      applicationSpoc: "alex.brown@company.com",
      applicationOwner: "Development Team",
      platform: "Windows",
      location: "Data Center A",
      manufacturer: "VMware",
      ram: "8 GB",
      cpu: "2 vCPU",
      status: "New",
      lastUpdated: "2024-01-16T14:30:00Z"
    }
  ];

  const [servers, setServers] = useState(mockServers);

  // Mock user data
  const mockUser = {
    name: "Admin User",
    email: "admin@infosectools.com",
    role: "admin"
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleFilterToggle = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleServerSelect = (serverId, isSelected) => {
    if (isSelected) {
      setSelectedServers([...selectedServers, serverId]);
    } else {
      setSelectedServers(selectedServers.filter(id => id !== serverId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedServers(filteredServers.map(server => server.id));
    } else {
      setSelectedServers([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on servers:`, selectedServers);
    // Implement bulk actions here
    setSelectedServers([]);
  };

  const handleAddServer = () => {
    navigate('/add-edit-server');
  };

  const handleImportExcel = () => {
    navigate('/excel-import-export');
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Implement export functionality
  };

  const handleEditServer = (serverId) => {
    navigate(`/add-edit-server?id=${serverId}`);
  };

  const handleDeleteServer = (serverId) => {
    setServers(servers.filter(server => server.id !== serverId));
    setSelectedServers(selectedServers.filter(id => id !== serverId));
  };

  // Filter and search logic
  const filteredServers = servers.filter(server => {
    // Search filter
    const searchMatch = !searchQuery || 
      Object.values(server).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category filters
    const osMatch = filters.operatingSystem.length === 0 || 
      filters.operatingSystem.includes(server.operatingSystem);
    const locationMatch = filters.location.length === 0 || 
      filters.location.includes(server.location);
    const manufacturerMatch = filters.manufacturer.length === 0 || 
      filters.manufacturer.includes(server.manufacturer);
    const ownerMatch = filters.applicationOwner.length === 0 || 
      filters.applicationOwner.includes(server.applicationOwner);
    const typeMatch = filters.serverType.length === 0 || 
      filters.serverType.includes(server.serverType);
    const statusMatch = filters.status.length === 0 || 
      filters.status.includes(server.status);

    return searchMatch && osMatch && locationMatch && manufacturerMatch && 
           ownerMatch && typeMatch && statusMatch;
  });

  // Sort logic
  const sortedServers = [...filteredServers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const totalItems = sortedServers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServers = sortedServers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={isCollapsed}
        mobileOpen={isMobileOpen}
        onToggle={toggleSidebar}
        onCloseMobile={closeMobileSidebar}
        userRole={mockUser.role}
      />
      
      <Header 
        user={mockUser}
        onLogout={handleLogout}
        onThemeToggle={toggleTheme}
        themeMode={theme}
        sidebarCollapsed={isCollapsed}
        onSidebarToggle={toggleSidebar}
      />

      {/* Filter Panel Overlay */}
      {filterPanelOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setFilterPanelOpen(false)}
        />
      )}

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        servers={servers}
      />

      {/* Main Content */}
      <main className={`
        transition-all duration-300 ease-in-out pt-16
        ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Server Inventory Management
                </h1>
                <p className="text-text-secondary">
                  Manage and track your server infrastructure across all locations
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <div className="text-sm text-text-secondary">
                  Total Servers: <span className="font-semibold text-text-primary">{totalItems}</span>
                </div>
                <div className="h-6 w-px bg-secondary-300"></div>
                <div className="text-sm text-text-secondary">
                  Selected: <span className="font-semibold text-primary">{selectedServers.length}</span>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar 
                  searchQuery={searchQuery}
                  onSearch={handleSearch}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleFilterToggle}
                  className={`
                    px-4 py-2 rounded-lg border transition-smooth flex items-center space-x-2
                    ${filterPanelOpen 
                      ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-default hover:bg-secondary-50'
                    }
                  `}
                >
                  <Icon name="Filter" size={18} />
                  <span>Filters</span>
                  {Object.values(filters).some(arr => arr.length > 0) && (
                    <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                      {Object.values(filters).reduce((acc, arr) => acc + arr.length, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <ActionButtons 
              onAddServer={handleAddServer}
              onImportExcel={handleImportExcel}
              onExportData={handleExportData}
            />

            {/* Bulk Actions */}
            {selectedServers.length > 0 && (
              <BulkActions 
                selectedCount={selectedServers.length}
                onBulkAction={handleBulkAction}
              />
            )}
          </div>

          {/* Server Table */}
          <div className="bg-surface rounded-lg shadow-card border border-default">
            <ServerTable 
              servers={paginatedServers}
              selectedServers={selectedServers}
              onServerSelect={handleServerSelect}
              onSelectAll={handleSelectAll}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEditServer={handleEditServer}
              onDeleteServer={handleDeleteServer}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServerInventoryManagement;