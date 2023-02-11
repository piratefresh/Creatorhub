import cn from "clsx";
import s from "./Toggle.module.css";
import * as Switch from "@radix-ui/react-switch";

interface ToggleProps extends Switch.SwitchProps {}

export const Toggle = ({ className, id, name }: ToggleProps) => {
  const wrapperClassName = cn(s.SwitchRoot, {});

  const rootClassName = cn(s.SwitchThumb, {}, className);
  return (
    <Switch.Root className={wrapperClassName} id={id} name={name}>
      <Switch.Thumb className={rootClassName} />
    </Switch.Root>
  );
};


