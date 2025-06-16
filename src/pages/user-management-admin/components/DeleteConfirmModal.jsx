import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DeleteConfirmModal = ({ user, onConfirm, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleConfirm = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isConfirmValid = confirmText.toLowerCase() === 'delete';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-default">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center mr-3">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">
              Delete User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            disabled={isDeleting}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-text-primary mb-4">
              Are you sure you want to delete the user account for{' '}
              <span className="font-semibold">{user?.username}</span>?
            </p>
            
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-error-700 mb-2">
                This action cannot be undone
              </h4>
              <ul className="text-sm text-error-600 space-y-1">
                <li>• User will lose access to the system immediately</li>
                <li>• All user sessions will be terminated</li>
                <li>• User data and activity logs will be permanently removed</li>
                <li>• Any ongoing work or unsaved changes will be lost</li>
              </ul>
            </div>

            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icon name="User" size={16} className="text-text-secondary mr-3 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-text-secondary">Username:</span>
                      <span className="font-medium text-text-primary">{user?.username}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-text-secondary">Email:</span>
                      <span className="font-medium text-text-primary">{user?.email}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-text-secondary">Role:</span>
                      <span className="font-medium text-text-primary capitalize">
                        {user?.role === 'admin' ? 'Administrator' : 'Read-only'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status:</span>
                      <span className={`font-medium capitalize ${
                        user?.status === 'active' ? 'text-success' : 'text-secondary-600'
                      }`}>
                        {user?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Type "delete" to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 border border-default rounded-lg focus:ring-2 focus:ring-error focus:border-error transition-smooth"
              placeholder="Type 'delete' to confirm"
              disabled={isDeleting}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-default rounded-lg font-medium text-text-secondary hover:bg-secondary-50 transition-smooth"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-error text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isDeleting || !isConfirmValid}
            >
              {isDeleting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Icon name="Trash2" size={20} className="mr-2" />
                  Delete User
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;