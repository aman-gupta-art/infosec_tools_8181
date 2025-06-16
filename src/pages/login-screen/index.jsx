import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock credentials for different user roles
  const mockCredentials = [
    {
      username: 'admin@infosec.com',
      password: 'Admin@123',
      role: 'admin',
      name: 'Admin User'
    },
    {
      username: 'user@infosec.com',
      password: 'User@123',
      role: 'user',
      name: 'Read-only User'
    },
    {
      username: 'security.admin',
      password: 'SecurePass@2024',
      role: 'admin',
      name: 'Security Administrator'
    },
    {
      username: 'it.analyst',
      password: 'Analyst@456',
      role: 'user',
      name: 'IT Analyst'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    } else if (formData.username.includes('@') && !/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginAttempts >= 5) {
      setErrors({
        general: 'Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes or contact your administrator.'
      });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // Simulate API call delay
    setTimeout(() => {
      const user = mockCredentials.find(
        cred => cred.username === formData.username && cred.password === formData.password
      );

      if (user) {
        // Successful login
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        // Failed login
        setLoginAttempts(prev => prev + 1);
        const remainingAttempts = 5 - (loginAttempts + 1);
        
        if (remainingAttempts > 0) {
          setErrors({
            general: `Invalid username or password. ${remainingAttempts} attempts remaining before account lockout.`
          });
        } else {
          setErrors({
            general: 'Account locked due to multiple failed attempts. Please contact your administrator.'
          });
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In a real application, this would navigate to password reset
    alert('Password reset functionality would be implemented here. Please contact your administrator for password reset.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            InfoSec Tools
          </h1>
          <p className="text-text-secondary">
            Server Infrastructure Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-surface rounded-xl shadow-elevated border border-default p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Sign In
            </h2>
            <p className="text-sm text-text-secondary">
              Access your server inventory dashboard
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-start">
              <Icon name="Info" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-primary font-medium mb-1">Demo Credentials:</p>
                <p className="text-primary-700 text-xs">
                  Admin: admin@infosec.com / Admin@123<br />
                  User: user@infosec.com / User@123
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-start">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-error">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Username/Email Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="User" size={18} className="text-text-secondary" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.username 
                      ? 'border-error bg-error-50' :'border-secondary-300 bg-surface'
                  }`}
                  placeholder="Enter your username or email"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={18} className="text-text-secondary" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.password 
                      ? 'border-error bg-error-50' :'border-secondary-300 bg-surface'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  <Icon 
                    name={showPassword ? 'EyeOff' : 'Eye'} 
                    size={18} 
                    className="text-text-secondary hover:text-text-primary transition-smooth" 
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || loginAttempts >= 5}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Sign In
                </>
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 font-medium transition-smooth"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-secondary-200">
            <div className="flex items-start text-xs text-text-secondary">
              <Icon name="Shield" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>
                This system is for authorized personnel only. All activities are monitored and logged for security purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} InfoSec Tools. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;