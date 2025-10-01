// import React from "react";

// const Button = ({
//   children,
//   onClick,
//   className,
//   type = "button",
//   size = "md",
//   variant = "primary",
// }) => {
//   const baseStyles =
//     "font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

//   const sizeStyles = {
//     sm: "h-8 rounded-md px-3 text-xs",
//     md: "px-5 py-2.5 text-base",
//     lg: "h-10 rounded-md px-8",
//     icon: 'h-9 w-9'
//   };
//   const variantStyles = {
//     // primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
//     primary: 'bg-[#008055] hover:bg-[#0A6647] active:bg-[#124E3B] text-white dark:bg-[#008055] dark:hover:bg-[#0A6647] dark:active:bg-[#124E3B] dark:text-white',
//     secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
//     outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950',
//     ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
//     danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600'
//   };
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${baseStyles} ${className} ${sizeStyles[size]} ${variantStyles[variant]}`}>
//       {children}
//     </button>
//   );
// };

// export default Button;
import React from "react";
import { Slot } from "@radix-ui/react-slot";

const Button = ({
  children,
  onClick,
  className,
  type = "button",
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) => {
  // Base styles for the button
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  // Variant styles for different button types
  const variantStyles = {
    default:
      "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline:
      "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  // Size styles for different button sizes
  const sizeStyles = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  // Determine which HTML element to render
  const Comp = asChild ? Slot : "button";

  // Combine all styles
  const buttonClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`;

  return (
    <Comp
      type={type}
      onClick={onClick}
      className={buttonClassName}
      {...props}
    >
      {children}
    </Comp>
  );
};

Button.displayName = "Button";

export default Button;
