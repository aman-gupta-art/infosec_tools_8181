// src/hooks/useSidebar.js
import { useState, useEffect } from 'react';

const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Get sidebar state from localStorage or default based on screen size
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        return JSON.parse(savedState);
      }
      // Default to collapsed on smaller screens
      return window.innerWidth < 1024;
    }
    return false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Save sidebar state to localStorage
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      // Close mobile sidebar on resize to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      // On mobile, toggle mobile overlay
      setIsMobileOpen(!isMobileOpen);
    } else {
      // On desktop, toggle collapsed state
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    closeMobileSidebar,
    setIsCollapsed,
    setIsMobileOpen
  };
};

export default useSidebar;