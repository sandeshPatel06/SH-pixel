import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    outline: 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300'
  };
  
  const clickableStyles = onClick 
    ? 'cursor-pointer hover:bg-opacity-80' 
    : '';
  
  const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`;
  
  return (
    <span className={badgeClasses} onClick={onClick}>
      {children}
    </span>
  );
};

export default Badge;