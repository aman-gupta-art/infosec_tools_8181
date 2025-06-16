import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ServerForm from './components/ServerForm';

const AddEditServer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [isEditing, setIsEditing] = useState(false);
  const [serverData, setServerData] = useState(null);

  // Mock user data
  const mockUser = {
    name: "Admin User",
    email: "admin@infosectools.com",
    role: "admin"
  };

  useEffect(() => {
    // Check if we're editing a server (passed via state)
    if (location.state?.server) {
      setIsEditing(true);
      setServerData(location.state.server);
    }
  }, [location.state]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleSaveServer = (formData) => {
    // Mock save functionality
    console.log('Saving server:', formData);
    
    // Simulate API call
    setTimeout(() => {
      alert(isEditing ? 'Server updated successfully!' : 'Server added successfully!');
      navigate('/server-inventory-management');
    }, 500);
  };

  const handleSaveAndAddAnother = (formData) => {
    // Mock save functionality
    console.log('Saving server and adding another:', formData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Server saved successfully! Ready to add another.');
      setServerData(null);
      setIsEditing(false);
      // Reset form by re-rendering
      window.location.reload();
    }, 500);
  };

  const handleCancel = () => {
    navigate('/server-inventory-management');
  };

  // Custom breadcrumbs
  const customBreadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home'
    },
    {
      label: 'Server Inventory',
      path: '/server-inventory-management'
    },
    {
      label: isEditing ? `Edit Server - ${serverData?.hostname || 'Unknown'}` : 'Add Server',
      current: true
    }
  ];

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
        onThemeToggle={handleThemeToggle}
        themeMode={themeMode}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
      `}>
        <div className="p-6">
          <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {isEditing ? 'Edit Server' : 'Add New Server'}
                </h1>
                <p className="text-text-secondary">
                  {isEditing 
                    ? 'Update server information and configuration details'
                    : 'Enter comprehensive server details for inventory tracking'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name={isEditing ? "Edit" : "Plus"} size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Server Form */}
          <div className="bg-surface rounded-lg shadow-card border border-default">
            <div className="p-6 border-b border-light">
              <div className="flex items-center space-x-3">
                <Icon name="Server" size={20} className="text-primary" />
                <h2 className="text-xl font-semibold text-text-primary">
                  Server Information
                </h2>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Complete all required fields to maintain accurate server inventory
              </p>
            </div>

            <div className="p-6">
              <ServerForm
                initialData={serverData}
                isEditing={isEditing}
                onSave={handleSaveServer}
                onSaveAndAddAnother={handleSaveAndAddAnother}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEditServer;