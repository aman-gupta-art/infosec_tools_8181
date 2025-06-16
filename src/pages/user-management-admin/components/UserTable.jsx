import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UserTable = ({ 
  users, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onResetPassword 
}) => {
  const [sortField, setSortField] = useState('username');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'lastLogin') {
      aValue = aValue ? new Date(aValue) : new Date(0);
      bValue = bValue ? new Date(bValue) : new Date(0);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-warning-100 text-warning-700 border-warning-200',
      user: 'bg-primary-100 text-primary-700 border-primary-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[role]}`}>
        {role === 'admin' ? 'Administrator' : 'Read-only'}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-success-100 text-success-700 border-success-200',
      inactive: 'bg-secondary-100 text-secondary-700 border-secondary-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleDropdownToggle = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  return (
    <div className="bg-surface rounded-lg border border-default overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-default">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('username')}
                  className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  Username
                  <Icon 
                    name={sortField === 'username' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="ml-1" 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  Email
                  <Icon 
                    name={sortField === 'email' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="ml-1" 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  Role
                  <Icon 
                    name={sortField === 'role' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="ml-1" 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  Status
                  <Icon 
                    name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="ml-1" 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  Last Login
                  <Icon 
                    name={sortField === 'lastLogin' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="ml-1" 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-secondary-50 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <span className="font-medium text-text-primary">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{user.email}</td>
                <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                <td className="px-6 py-4 text-text-secondary">{formatDate(user.lastLogin)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(user.id)}
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
                    >
                      <Icon name="MoreVertical" size={16} />
                    </button>
                    
                    {activeDropdown === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-default py-2 z-50">
                        <button
                          onClick={() => {
                            onEdit(user);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                        >
                          <Icon name="Edit" size={16} className="mr-3" />
                          Edit User
                        </button>
                        <button
                          onClick={() => {
                            onToggleStatus(user.id);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                        >
                          <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={16} className="mr-3" />
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            onResetPassword(user);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                        >
                          <Icon name="Key" size={16} className="mr-3" />
                          Reset Password
                        </button>
                        <div className="border-t border-light my-2"></div>
                        <button
                          onClick={() => {
                            onDelete(user);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                        >
                          <Icon name="Trash2" size={16} className="mr-3" />
                          Delete User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="p-4 border-b border-default last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{user.username}</h3>
                  <p className="text-sm text-text-secondary">{user.email}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(user.id)}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
                >
                  <Icon name="MoreVertical" size={16} />
                </button>
                
                {activeDropdown === user.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-default py-2 z-50">
                    <button
                      onClick={() => {
                        onEdit(user);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                    >
                      <Icon name="Edit" size={16} className="mr-3" />
                      Edit User
                    </button>
                    <button
                      onClick={() => {
                        onToggleStatus(user.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                    >
                      <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={16} className="mr-3" />
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => {
                        onResetPassword(user);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
                    >
                      <Icon name="Key" size={16} className="mr-3" />
                      Reset Password
                    </button>
                    <div className="border-t border-light my-2"></div>
                    <button
                      onClick={() => {
                        onDelete(user);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                    >
                      <Icon name="Trash2" size={16} className="mr-3" />
                      Delete User
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>
            
            <div className="text-sm text-text-secondary">
              <p>Last Login: {formatDate(user.lastLogin)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-default bg-secondary-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-default rounded text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-text-secondary">
                of {users.length} users
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-default rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100 transition-smooth"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              <span className="px-4 py-2 text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-default rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100 transition-smooth"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;