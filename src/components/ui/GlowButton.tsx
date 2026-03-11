import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type GlowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const GlowButton = ({ label, className, type = "button", ...props }: GlowButtonProps) => {
  return (
    <button className={clsx("btn-gradient", className)} type={type} {...props}>
      <span className="relative z-10">{label}</span>
    </button>
  );
};
