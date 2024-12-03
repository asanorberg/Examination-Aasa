import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cta" | "outline";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "cta",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold transition-all duration-300 ease-in-out";

  const variantStyles = {
    cta: "bg-coal text-white focus:outline-none flex flex-row text-confirmation border-none items-center  justify-center h-[78px] gap-[8px] bg-coal text-snow rounded-[4px] text-[24px] leading-[28.8px] font-medium px-[20px] py-[20px] hover:cursor-pointer select-none",
    outline:
      "border-3 border-ash border-opacity-75 text-ash border-solid flex w-[358px] items-center bg-transparent h-[78px] rounded-[4px] text-[32px] leading-[38.4px] font-bold hover:cursor-pointer select-none",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
