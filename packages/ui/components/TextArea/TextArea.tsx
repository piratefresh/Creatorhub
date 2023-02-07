import cn from "clsx";
import s from "../Input/Input.module.css";
import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

  error?: FieldError | undefined;
}

export const TextArea = ({
  className,
  children,
  onChange,
  htmlSize,
  name,
  error,
  ...rest
}: InputProps) => {
  const wrapperClassName = cn(s.wrapper, {});

  const rootClassName = cn(
    s.root,
    { [s.rounded]: true, [s.error]: error },
    className
  );

  const handleOnChange = (e: any) => {
    if (onChange && e.target) {
      onChange(e.target?.value);
    }
    return null;
  };

  return (
    <div className={wrapperClassName}>
      <textarea
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        name={name}
        spellCheck="false"
        {...rest}
      />
    </div>
  );
};
