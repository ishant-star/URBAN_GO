import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  text,
  fullScreen = false,
  className = '' 
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Color styles
  const colorStyles = {
    primary: 'text-green-600',
    secondary: 'text-neutral-600',
    white: 'text-white',
  };

  const spinnerClasses = `
    animate-spin rounded-full border-2 border-current border-t-transparent
    ${sizeStyles[size]}
    ${colorStyles[color]}
    ${className}
  `;

  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={spinnerClasses} />
      {text && (
        <p className={`text-sm font-medium ${colorStyles[color]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;