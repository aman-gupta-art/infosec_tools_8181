/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        'primary-900': '#1E3A8A', // Very dark blue - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Professional slate gray - slate-500
        'secondary-50': '#F8FAFC', // Very light slate - slate-50
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Light slate - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate - slate-300
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-600': '#475569', // Dark slate - slate-600
        'secondary-700': '#334155', // Darker slate - slate-700
        'secondary-800': '#1E293B', // Very dark slate - slate-800
        'secondary-900': '#0F172A', // Near black slate - slate-900

        // Accent Colors
        'accent': '#0EA5E9', // Bright blue accent - sky-500
        'accent-50': '#F0F9FF', // Very light sky - sky-50
        'accent-100': '#E0F2FE', // Light sky - sky-100
        'accent-200': '#BAE6FD', // Light sky - sky-200
        'accent-500': '#0EA5E9', // Medium sky - sky-500
        'accent-600': '#0284C7', // Dark sky - sky-600
        'accent-700': '#0369A1', // Darker sky - sky-700

        // Background Colors
        'background': '#FAFAFA', // Warm white background - gray-50
        'surface': '#FFFFFF', // Pure white surface - white

        // Text Colors
        'text-primary': '#0F172A', // Near-black primary text - slate-900
        'text-secondary': '#475569', // Medium gray secondary text - slate-600

        // Status Colors
        'success': '#059669', // Forest green success - emerald-600
        'success-50': '#ECFDF5', // Very light emerald - emerald-50
        'success-100': '#D1FAE5', // Light emerald - emerald-100
        'success-500': '#10B981', // Medium emerald - emerald-500

        'warning': '#D97706', // Amber orange warning - amber-600
        'warning-50': '#FFFBEB', // Very light amber - amber-50
        'warning-100': '#FEF3C7', // Light amber - amber-100
        'warning-500': '#F59E0B', // Medium amber - amber-500

        'error': '#DC2626', // Professional red error - red-600
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        'error-500': '#EF4444', // Medium red - red-500
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      borderColor: {
        'default': 'rgba(148, 163, 184, 0.2)',
        'light': 'rgba(148, 163, 184, 0.1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}