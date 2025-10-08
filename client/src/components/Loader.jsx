import React from 'react';

const Loader = ({ size = 'md', variant = 'spinner' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'pulse') {
    return (
      <div className="flex justify-center items-center gap-2">
        <div className={`${sizeClasses[size]} bg-purple-600 rounded-full animate-pulse`} style={{ animationDelay: '0s' }}></div>
        <div className={`${sizeClasses[size]} bg-purple-500 rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`${sizeClasses[size]} bg-purple-400 rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center gap-2">
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className="flex justify-center items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-purple-600 rounded-full animate-pulse"
            style={{
              height: '24px',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export { Loader };