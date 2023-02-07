import cn from "clsx";
import s from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "error" | "success" | "warning" | "primary";
}

export const Badge = ({
  children,
  className,
  variant = "primary",
}: BadgeProps) => {
  const rootClassName = cn(
    s.root,
    {
      [s.error]: variant === "error",
      [s.success]: variant === "success",
      [s.warning]: variant === "warning",
      [s.primary]: variant === "primary",
    },
    className
  );
  return <div className={rootClassName}>{children}</div>;
};
