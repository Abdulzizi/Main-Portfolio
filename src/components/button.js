import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, type, className, variant }) => {
  let buttonClasses = 'py-2 px-4 rounded focus:outline-none';

  // Define variants
  if (variant === 'primary') {
    buttonClasses += ' bg-purple-500 hover:bg-purple-700 text-white font-bold';
  } else if (variant === 'secondary') {
    buttonClasses += ' bg-gray-500 hover:bg-gray-700 text-white font-bold';
  } else {
    buttonClasses += ' bg-blue-500 hover:bg-blue-700 text-white font-bold';
  }

  // Add custom classes if provided
  if (className) {
    buttonClasses += ` ${className}`;
  }

  return (
    <button
      className={buttonClasses}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  type: 'button',
  variant: 'default',
  children: "Click Me"
};

export default Button;