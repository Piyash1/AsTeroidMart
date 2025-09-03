import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  handleClick?: () => void;
}

const Button = ({ className, children, disabled, handleClick, ...props }: Props) => {
  return <button 
    onClick={disabled ? undefined : handleClick} 
    className={className} 
    disabled={disabled}
    {...props}
  >
    {children}
  </button>;
};

export default Button;
