import React from "react";

function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <button className={`cursor-pointer ${className}`}>{children}</button>;
}

export default Button;
