import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import cn from "clsx";
import s from "./Checkbox.module.css";

interface ToggleProps extends CheckboxPrimitive.CheckboxProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "circle" | "rectangle";
}

export const Checkbox = ({
  className,
  id,
  name,
  size = "md",
  variant,
}: ToggleProps) => {
  const wrapperClassName = cn(s.CheckboxRoot, {
    [s.circle]: variant === "circle",
    [s.rectangle]: variant === "rectangle",
  });

  const rootClassName = cn(
    s.CheckboxIndicator,
    {
      [s.sm]: size === "sm",
      [s.md]: size === "md",
    },
    className
  );

  return (
    <CheckboxPrimitive.Root
      className={wrapperClassName}
      defaultChecked
      id={id}
      name={name}
    >
      <CheckboxPrimitive.Indicator className={rootClassName}>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
