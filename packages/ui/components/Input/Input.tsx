import cn from "clsx";
import s from "./Input.module.css";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;

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

  error?: FieldError | undefined;
}

export function hasAddon({
  addonBefore,
  addonAfter,
}: {
  addonAfter: React.ReactNode;
  addonBefore: React.ReactNode;
}) {
  return !!(addonBefore || addonAfter);
}

export const Input = ({
  addonBefore,
  addonAfter,
  className,
  children,

  htmlSize,
  name,
  error,
  ...rest
}: InputProps) => {
  const wrapperClassName = cn(s.wrapper, {
    [s.addonWrapper]: hasAddon({ addonBefore, addonAfter }),
  });

  const rootClassName = cn(
    s.root,
    {
      [s.rounded]: !hasAddon({ addonBefore, addonAfter }),
      [s.hideBorderBefore]: addonBefore,
      [s.hideBorderAfter]: addonAfter,
      [s.error]: error,
    },
    className
  );

  return (
    <div className={wrapperClassName}>
      {addonBefore && <span className="flex self-stretch">{addonBefore}</span>}

      <input
        size={htmlSize}
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        name={name}
        spellCheck="false"
        {...rest}
      />
      {addonAfter && <span className="flex self-stretch">{addonAfter}</span>}
    </div>
  );
};
