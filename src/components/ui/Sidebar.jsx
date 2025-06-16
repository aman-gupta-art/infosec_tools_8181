// src/components/ui/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ collapsed = false, mobileOpen = false, onToggle, onCloseMobile, userRole = 'user' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  const navigationItems = [
    {
      section: 'overview',
      label: 'Dashboard',
      items: [
        {
          label: 'Dashboard',
          path: '/dashboard',
          icon: 'LayoutDashboard',
          tooltip: 'Infrastructure overview and KPI monitoring'
        }
      ]
    },
    {
      section: 'server-management',
      label: 'Server Management',
      items: [
        {
          label: 'Server Inventory',
          path: '/server-inventory-management',
          icon: 'Server',
          tooltip: 'Manage server inventory and configurations'
        },
        {
          label: 'Add/Edit Server',
          path: '/add-edit-server',
          icon: 'Plus',
          tooltip: 'Add new servers or edit existing configurations'
        },
        {
          label: 'Import/Export',
          path: '/excel-import-export',
          icon: 'FileSpreadsheet',
          tooltip: 'Bulk operations for server data'
        }
      ]
    },
    {
      section: 'administration',
      label: 'Administration',
      items: [
        {
          label: 'User Management',
          path: '/user-management-admin',
          icon: 'Users',
          roleRequired: 'admin',
          tooltip: 'Manage user accounts and permissions'
        }
      ]
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    for (const section of navigationItems) {
      for (const item of section.items) {
        if (item.path === currentPath) {
          setActiveSection(section.section);
          break;
        }
      }
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    // Close mobile sidebar after navigation
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const isItemVisible = (item) => {
    if (!item.roleRequired) return true;
    return userRole === item.roleRequired;
  };

  const isSectionVisible = (section) => {
    return section.items.some(item => isItemVisible(item));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-surface border-r border-default z-60
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`
            flex items-center px-4 py-6 border-b border-light
            ${collapsed ? 'justify-center' : 'justify-between'}
          `}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Server" size={20} color="white" />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-text-primary">
                    ServerHub
                  </span>
                  <span className="text-xs text-text-secondary">
                    Infrastructure Management
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={onToggle}
                className="p-1.5 rounded-md hover:bg-secondary-100 transition-smooth lg:block hidden"
              >
                <Icon name="PanelLeftClose" size={18} color="currentColor" />
              </button>
            )}
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-md hover:bg-secondary-100 transition-smooth lg:hidden"
            >
              <Icon name="X" size={18} color="currentColor" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
            {navigationItems.map((section) => {
              if (!isSectionVisible(section)) return null;
              
              return (
                <div key={section.section}>
                  {!collapsed && (
                    <h3 className="px-3 mb-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {section.label}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      if (!isItemVisible(item)) return null;
                      
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <li key={item.path}>
                          <button
                            onClick={() => handleNavigation(item.path)}
                            title={collapsed ? item.tooltip : ''}
                            className={`
                              w-full flex items-center px-3 py-2.5 rounded-lg text-left
                              transition-smooth group relative
                              ${isActive 
                                ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                              }
                              ${collapsed ? 'justify-center' : 'justify-start'}
                            `}
                          >
                            <Icon 
                              name={item.icon} 
                              size={20} 
                              className={`
                                ${isActive ? 'text-primary' : 'text-current'}
                                ${collapsed ? '' : 'mr-3'}
                              `}
                            />
                            {!collapsed && (
                              <span className="font-medium text-sm">
                                {item.label}
                              </span>
                            )}
                            {item.roleRequired === 'admin' && !collapsed && (
                              <Icon 
                                name="Shield" 
                                size={14} 
                                className="ml-auto text-warning-500"
                              />
                            )}
                            
                            {/* Tooltip for collapsed state */}
                            {collapsed && (
                              <div className="
                                absolute left-full ml-2 px-2 py-1 bg-secondary-800 text-white text-xs rounded
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-200 whitespace-nowrap z-70
                              ">
                                {item.label}
                                {item.roleRequired === 'admin' && (
                                  <span className="ml-1 text-warning-300">•</span>
                                )}
                              </div>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>

          {/* Collapse Toggle for Desktop */}
          {collapsed && (
            <div className="p-3 border-t border-light hidden lg:block">
              <button
                onClick={onToggle}
                className="w-full p-2 rounded-lg hover:bg-secondary-100 transition-smooth flex items-center justify-center"
              >
                <Icon name="PanelLeftOpen" size={20} color="currentColor" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;