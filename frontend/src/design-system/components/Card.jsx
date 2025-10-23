import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = false,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = `
    bg-white rounded-xl border transition-all duration-300 ease-in-out
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
  `;

  // Variant styles
  const variantStyles = {
    default: 'border-neutral-200',
    elevated: 'border-transparent shadow-lg',
    outlined: 'border-2 border-neutral-300',
    ghost: 'border-transparent bg-transparent',
  };

  // Padding styles
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  // Shadow styles
  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;