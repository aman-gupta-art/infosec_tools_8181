import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import RecentActivity from './components/RecentActivity';

const UserManagementAdmin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [users, setUsers] = useState([]);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      username: 'admin_john',
      email: 'john.doe@infosec.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date('2024-01-15T10:30:00'),
      createdAt: new Date('2023-06-15T09:00:00'),
      createdBy: 'System Admin'
    },
    {
      id: 2,
      username: 'sarah_analyst',
      email: 'sarah.wilson@infosec.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date('2024-01-14T16:45:00'),
      createdAt: new Date('2023-08-22T11:30:00'),
      createdBy: 'John Doe'
    },
    {
      id: 3,
      username: 'mike_security',
      email: 'mike.johnson@infosec.com',
      role: 'admin',
      status: 'inactive',
      lastLogin: new Date('2024-01-10T14:20:00'),
      createdAt: new Date('2023-09-05T08:15:00'),
      createdBy: 'John Doe'
    },
    {
      id: 4,
      username: 'lisa_readonly',
      email: 'lisa.brown@infosec.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date('2024-01-15T09:15:00'),
      createdAt: new Date('2023-10-12T13:45:00'),
      createdBy: 'John Doe'
    },
    {
      id: 5,
      username: 'david_ops',
      email: 'david.clark@infosec.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date('2024-01-13T12:30:00'),
      createdAt: new Date('2023-11-08T10:20:00'),
      createdBy: 'Sarah Wilson'
    }
  ];

  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@infosec.com',
    role: 'admin'
  };

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleAddUser = () => {
    setModalMode('add');
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleResetPassword = (user) => {
    console.log('Reset password for:', user.username);
    // Mock password reset functionality
    alert(`Password reset email sent to ${user.email}`);
  };

  const handleSaveUser = (userData) => {
    if (modalMode === 'add') {
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
        createdAt: new Date(),
        createdBy: currentUser.name,
        lastLogin: null
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData }
          : user
      ));
    }
    setShowUserModal(false);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    recentLogins: users.filter(u => u.lastLogin && 
      (new Date() - u.lastLogin) < 24 * 60 * 60 * 1000).length
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
        userRole={currentUser.role}
      />
      
      <Header 
        user={currentUser}
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
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                User Management
              </h1>
              <p className="text-text-secondary">
                Manage user accounts, roles, and permissions for the InfoSec Tools platform
              </p>
            </div>
            <button
              onClick={handleAddUser}
              className="mt-4 lg:mt-0 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center"
            >
              <Icon name="UserPlus" size={20} className="mr-2" />
              Add New User
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-text-primary">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-success">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Administrators</p>
                  <p className="text-2xl font-bold text-warning">{stats.adminUsers}</p>
                </div>
                <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Recent Logins</p>
                  <p className="text-2xl font-bold text-accent">{stats.recentLogins}</p>
                </div>
                <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2">
              {/* Filters */}
              <div className="bg-surface rounded-lg border border-default p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Icon 
                        name="Search" 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                      />
                      <input
                        type="text"
                        placeholder="Search users by username or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="px-4 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="user">Read-only</option>
                    </select>
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* User Table */}
              <UserTable
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleUserStatus}
                onResetPassword={handleResetPassword}
              />
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showUserModal && (
        <UserModal
          mode={modalMode}
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => setShowUserModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          user={selectedUser}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default UserManagementAdmin;