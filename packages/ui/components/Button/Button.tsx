import React from "react";
import cn from "clsx";
import { mergeRefs } from "react-merge-refs";
import s from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "slim" | "ghost" | "naked";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | React.JSXElementConstructor<any>;
  width?: string | number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  loading?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "flat",
      children,
      active,
      width,
      size = "md",
      loading = false,
      disabled = false,
      style = {},
      Component = "button",
      ...rest
    }: ButtonProps,
    buttonRef
  ) => {
    const ref = React.useRef<typeof Component>(null);

    const rootClassName = cn(
      s.root,
      {
        [s.ghost]: variant === "ghost",
        [s.slim]: variant === "slim",
        [s.naked]: variant === "naked",
        [s.sm]: size === "sm",
        [s.md]: size === "md",
        [s.lg]: size === "lg",
        [s.xl]: size === "xl",
        [s.xxl]: size === "2xl",
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    );

    return (
      <Component
        className={rootClassName}
        disabled={disabled}
        ref={mergeRefs([ref, buttonRef])}
      >
        {children}
      </Component>
    );
  }
);
