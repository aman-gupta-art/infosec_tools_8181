import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const UserModal = ({ mode, user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setFormData({
        username: '',
        email: '',
        role: 'user',
        status: 'active'
      });
    }
    setErrors({});
  }, [mode, user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const roleDescriptions = {
    admin: 'Full access to all features including user management, server configuration, and system settings.',
    user: 'Read-only access to server inventory and dashboard. Cannot modify data or access admin features.'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-default">
          <h2 className="text-xl font-semibold text-text-primary">
            {mode === 'add' ? 'Add New User' : 'Edit User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                  errors.username ? 'border-error' : 'border-default'
                }`}
                placeholder="Enter username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                  errors.email ? 'border-error' : 'border-default'
                }`}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                  errors.role ? 'border-error' : 'border-default'
                }`}
                disabled={isSubmitting}
              >
                <option value="user">Read-only User</option>
                <option value="admin">Administrator</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.role}
                </p>
              )}
              <p className="mt-2 text-sm text-text-secondary">
                {roleDescriptions[formData.role]}
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                disabled={isSubmitting}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <p className="mt-2 text-sm text-text-secondary">
                {formData.status === 'active' ?'User can log in and access the system' :'User cannot log in or access the system'
                }
              </p>
            </div>

            {/* Password Note for New Users */}
            {mode === 'add' && (
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon name="Info" size={20} className="text-accent mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-accent-700 mb-1">
                      Password Setup
                    </h4>
                    <p className="text-sm text-accent-600">
                      A temporary password will be generated and sent to the user's email address. 
                      They will be required to change it on first login.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-default rounded-lg font-medium text-text-secondary hover:bg-secondary-50 transition-smooth"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  {mode === 'add' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>
                  <Icon name={mode === 'add' ? 'UserPlus' : 'Save'} size={20} className="mr-2" />
                  {mode === 'add' ? 'Create User' : 'Update User'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;