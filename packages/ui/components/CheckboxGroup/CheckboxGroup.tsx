import * as ToggleGroup from "@radix-ui/react-toggle-group";
import cn from "clsx";
import s from "./CheckboxGroup.module.css";

interface CheckboxGroupProps
  extends Omit<ToggleGroup.ToggleProps, "type" | "defaultValue"> {
  type?: "single" | "multiple";
  defaultValue?: string;
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  onValueChange?(value: string | string[]): void;
}

interface CheckboxGroupItemProps extends ToggleGroup.ToggleGroupItemProps {
  isChecked: boolean;
}

export const CheckboxGroupRoot = ({
  children,
  className,
  "aria-label": ariaLabel,
  defaultValue,
  type = "single",
  onValueChange,
}: CheckboxGroupProps) => {
  return (
    <ToggleGroup.Root
      className={className}
      type={type as any}
      defaultValue={defaultValue}
      aria-label={ariaLabel}
      onValueChange={onValueChange}
    >
      {children}
    </ToggleGroup.Root>
  );
};

export const CheckboxGroupItem = ({
  className,
  children,
  "aria-label": ariaLabel,
  isChecked,
  value,
}: CheckboxGroupItemProps) => {
  const rootClassName = cn(
    s.ToggleGroupItem,
    { [s.checked]: isChecked },
    className
  );

  return (
    <ToggleGroup.Item
      className={rootClassName}
      value={value}
      aria-label={ariaLabel}
    >
      {children}
    </ToggleGroup.Item>
  );
};
