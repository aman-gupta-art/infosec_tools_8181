import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Please check the URL or navigate back to the dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center justify-center"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Go to Dashboard
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-secondary-100 text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-secondary-200 transition-smooth flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-text-secondary">
            Need help? Contact your system administrator or IT support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;