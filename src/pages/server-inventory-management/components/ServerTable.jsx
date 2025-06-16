import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ServerTable = ({
  servers,
  selectedServers,
  onServerSelect,
  onSelectAll,
  sortConfig,
  onSort,
  onEditServer,
  onDeleteServer,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  onPageChange,
  onItemsPerPageChange
}) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const columns = [
    { key: 'serverIp', label: 'Server IP', sortable: true },
    { key: 'hostname', label: 'Hostname', sortable: true },
    { key: 'operatingSystem', label: 'Operating System', sortable: true },
    { key: 'serverRole', label: 'Server Role', sortable: true },
    { key: 'serverType', label: 'Type', sortable: true },
    { key: 'applicationName', label: 'Application', sortable: true },
    { key: 'applicationOwner', label: 'Owner', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const handleSelectAll = (e) => {
    onSelectAll(e.target.checked);
  };

  const handleServerSelect = (serverId, e) => {
    onServerSelect(serverId, e.target.checked);
  };

  const handleSort = (key) => {
    onSort(key);
  };

  const handleRowExpand = (serverId) => {
    if (expandedRows.includes(serverId)) {
      setExpandedRows(expandedRows.filter(id => id !== serverId));
    } else {
      setExpandedRows([...expandedRows, serverId]);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Live': { bg: 'bg-success-100', text: 'text-success-600', icon: 'CheckCircle' },
      'Shutdown': { bg: 'bg-error-100', text: 'text-error-600', icon: 'XCircle' },
      'New': { bg: 'bg-accent-100', text: 'text-accent-600', icon: 'Plus' }
    };

    const config = statusConfig[status] || statusConfig['Live'];

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon name={config.icon} size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  const renderPagination = () => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 py-4 border-t border-default">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="border border-default rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-text-secondary">per page</span>
          </div>
          
          <div className="text-sm text-text-secondary">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-default text-sm font-medium text-text-secondary hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    currentPage === pageNum
                      ? 'bg-primary text-white' :'text-text-secondary hover:bg-secondary-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-default text-sm font-medium text-text-secondary hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedServers.length === servers.length && servers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-secondary-300 text-primary focus:ring-primary"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                    >
                      <span>{column.label}</span>
                      <div className="flex flex-col">
                        <Icon 
                          name="ChevronUp" 
                          size={12} 
                          className={`${
                            sortConfig.key === column.key && sortConfig.direction === 'asc' ?'text-primary' :'text-secondary-400'
                          }`}
                        />
                        <Icon 
                          name="ChevronDown" 
                          size={12} 
                          className={`-mt-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc' ?'text-primary' :'text-secondary-400'
                          }`}
                        />
                      </div>
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-secondary-200">
            {servers.map((server) => (
              <tr key={server.id} className="hover:bg-secondary-50 transition-smooth">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedServers.includes(server.id)}
                    onChange={(e) => handleServerSelect(server.id, e)}
                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  {server.serverIp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.hostname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.operatingSystem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.serverRole}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    server.serverType === 'Virtual' ?'bg-accent-100 text-accent-600' :'bg-secondary-100 text-secondary-600'
                  }`}>
                    {server.serverType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.applicationName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.applicationOwner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {server.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(server.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEditServer(server.id)}
                      className="text-primary hover:text-primary-700 transition-smooth"
                      title="Edit Server"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteServer(server.id)}
                      className="text-error hover:text-error-700 transition-smooth"
                      title="Delete Server"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="p-4 border-b border-default">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedServers.length === servers.length && servers.length > 0}
                onChange={handleSelectAll}
                className="rounded border-secondary-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Select All</span>
            </label>
            <span className="text-sm text-text-secondary">
              {selectedServers.length} selected
            </span>
          </div>
        </div>

        <div className="divide-y divide-secondary-200">
          {servers.map((server) => (
            <div key={server.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedServers.includes(server.id)}
                    onChange={(e) => handleServerSelect(server.id, e)}
                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-text-primary">{server.hostname}</div>
                    <div className="text-sm text-text-secondary">{server.serverIp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(server.status)}
                  <button
                    onClick={() => handleRowExpand(server.id)}
                    className="p-1 rounded-md hover:bg-secondary-100 transition-smooth"
                  >
                    <Icon 
                      name={expandedRows.includes(server.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                    />
                  </button>
                </div>
              </div>

              {expandedRows.includes(server.id) && (
                <div className="mt-3 pt-3 border-t border-secondary-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-text-secondary">OS:</span>
                      <div className="font-medium text-text-primary">{server.operatingSystem}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Role:</span>
                      <div className="font-medium text-text-primary">{server.serverRole}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Type:</span>
                      <div className="font-medium text-text-primary">{server.serverType}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">Location:</span>
                      <div className="font-medium text-text-primary">{server.location}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-text-secondary">Application:</span>
                      <div className="font-medium text-text-primary">{server.applicationName}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-text-secondary">Owner:</span>
                      <div className="font-medium text-text-primary">{server.applicationOwner}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">RAM:</span>
                      <div className="font-medium text-text-primary">{server.ram}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">CPU:</span>
                      <div className="font-medium text-text-primary">{server.cpu}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      onClick={() => onEditServer(server.id)}
                      className="px-3 py-1.5 bg-primary text-white rounded-md text-sm hover:bg-primary-700 transition-smooth"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteServer(server.id)}
                      className="px-3 py-1.5 bg-error text-white rounded-md text-sm hover:bg-error-700 transition-smooth"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default ServerTable;