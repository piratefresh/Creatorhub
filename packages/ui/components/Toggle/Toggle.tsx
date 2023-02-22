import cn from "clsx";
import s from "./Toggle.module.css";
import * as Switch from "@radix-ui/react-switch";

interface ToggleProps extends Omit<Switch.SwitchProps, "onChange"> {
  onChange: (checked: boolean) => void;
}

export const Toggle = ({
  className,
  id,
  name,
  onChange,
  ...props
}: ToggleProps) => {
  const wrapperClassName = cn(s.SwitchRoot, {});

  const rootClassName = cn(s.SwitchThumb, {}, className);
  return (
    <Switch.Root
      className={wrapperClassName}
      id={id}
      name={name}
      onCheckedChange={onChange}
      {...props}
    >
      <Switch.Thumb className={rootClassName} />
    </Switch.Root>
  );
};
