import cn from "clsx";
import s from "./Input.module.css";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;

  onChange?: (...args: any[]) => any;
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string;
  /**
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number;
  /**
   * Takes an node to place it to the left/start of the input, intended for icons
   * @example
   * addonBefore = <div>Icon</div>
   */
  addonBefore?: React.ReactNode;
  /**
   * Takes an node to place it to the right/end of the input, intended for icons
   * @example
   * addonBefore = <div>Icon</div>
   */
  addonAfter?: React.ReactNode;
}

export function hasAddon(props: InputProps) {
  return !!(props.addonBefore || props.addonAfter);
}

export const Input = ({
  addonBefore,
  addonAfter,
  className,
  children,
  onChange,
  htmlSize,
  name,
  ...rest
}: InputProps) => {
  const wrapperClassName = cn(s.wrapper, {
    [s.addonWrapper]: hasAddon,
    [s.rounded]: !hasAddon,
  });

  const rootClassName = cn(s.root, {}, className);

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <div className={wrapperClassName}>
      {addonBefore && (
        <span className="flex h-full rounded-l-lg">{addonBefore}</span>
      )}

      <input
        size={htmlSize}
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        name={name}
        spellCheck="false"
        {...rest}
      />
      {addonAfter && (
        <span className="flex h-full rounded-r-lg">{addonAfter}</span>
      )}
    </div>
  );
};
