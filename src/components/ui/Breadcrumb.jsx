import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard': 'Dashboard',
    '/server-inventory-management': 'Server Inventory',
    '/add-edit-server': 'Add/Edit Server',
    '/excel-import-export': 'Import/Export',
    '/user-management-admin': 'User Management',
    '/login-screen': 'Login'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/dashboard') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'Home'
      });
    }

    // Add current page
    const currentPath = location.pathname;
    const currentLabel = routeLabels[currentPath];
    
    if (currentLabel && currentPath !== '/dashboard') {
      breadcrumbs.push({
        label: currentLabel,
        path: currentPath,
        current: true
      });
    }

    // If we're on dashboard, show just dashboard
    if (location.pathname === '/dashboard') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        current: true,
        icon: 'LayoutDashboard'
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path, isCurrent) => {
    if (!isCurrent && path) {
      navigate(path);
    }
  };

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary mx-2" 
              />
            )}
            
            <div className="flex items-center">
              {crumb.icon && (
                <Icon 
                  name={crumb.icon} 
                  size={16} 
                  className={`mr-2 ${crumb.current ? 'text-primary' : 'text-text-secondary'}`}
                />
              )}
              
              {crumb.current ? (
                <span className="text-text-primary font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(crumb.path, crumb.current)}
                  className="text-text-secondary hover:text-primary transition-smooth font-medium"
                >
                  {crumb.label}
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;