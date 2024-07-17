const Button = ({ children, type, variant }) => {
  const baseClasses = 'py-2 px-4 rounded focus:outline-none transition duration-300 ease-in-out';
  const variantClasses = {
    primary: 'bg-purple-500 text-white border-purple-500 hover:bg-purple-700',
    secondary: 'bg-gray-500 text-white border-gray-500 hover:bg-gray-700',
    default: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-700',
  };

  let buttonClasses = baseClasses;

  switch (variant) {
    case 'primary':
      buttonClasses += ` ${variantClasses.primary}`;
      break;
    case 'secondary':
      buttonClasses += ` ${variantClasses.secondary}`;
      break;
    default:
      buttonClasses += ` ${variantClasses.default}`;
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

export default Button;