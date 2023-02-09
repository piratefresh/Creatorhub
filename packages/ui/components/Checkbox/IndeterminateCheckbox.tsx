import React from "react";
import { HTMLProps } from "react";
import cn from "clsx";
import s from "./Checkbox.module.css";

export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  const rootClassName = cn(s.CheckboxIndicator, {}, className);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={rootClassName + "cursor-pointer"}
      {...rest}
    />
  );
}
