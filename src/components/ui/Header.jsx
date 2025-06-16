// src/components/ui/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Header = ({ user, onLogout, onThemeToggle, themeMode = 'light', sidebarCollapsed, onSidebarToggle }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileToggle = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    if (onLogout) onLogout();
  };

  const handleThemeToggle = () => {
    setProfileDropdownOpen(false);
    if (onThemeToggle) onThemeToggle();
  };

  return (
    <header className={`
      fixed top-0 right-0 h-16 bg-surface border-b border-default z-70
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'left-16' : 'left-0 lg:left-64'}
    `}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Mobile Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} color="currentColor" />
          </button>
          
          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:block p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            aria-label="Toggle sidebar"
          >
            <Icon 
              name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} 
              size={20} 
              color="currentColor" 
            />
          </button>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
          >
            <Icon 
              name={themeMode === 'light' ? 'Moon' : 'Sun'} 
              size={20} 
              color="currentColor" 
            />
          </button>

          {/* Notifications */}
          <button 
            className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth relative"
            aria-label="Notifications"
          >
            <Icon name="Bell" size={20} color="currentColor" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-surface"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleProfileToggle}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-text-primary">
                  {user?.name || 'Admin User'}
                </div>
                <div className="text-xs text-text-secondary capitalize">
                  {user?.role || 'Administrator'}
                </div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-modal border border-default py-2 z-80">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-light">
                  <div className="text-sm font-medium text-text-primary">
                    {user?.name || 'Admin User'}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {user?.email || 'admin@serverhub.com'}
                  </div>
                  <div className="text-xs text-accent capitalize mt-1">
                    {user?.role || 'Administrator'}
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth">
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth">
                    <Icon name="Settings" size={16} className="mr-3" />
                    Preferences
                  </button>
                  <button 
                    onClick={handleThemeToggle}
                    className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                  >
                    <Icon name={themeMode === 'light' ? 'Moon' : 'Sun'} size={16} className="mr-3" />
                    {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-light pt-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;