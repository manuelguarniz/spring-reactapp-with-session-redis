import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "sm",
  border = true,
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const borderClasses = border ? "border border-gray-200" : "";

  const classes = `bg-white rounded-xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
