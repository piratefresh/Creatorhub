import cn from "clsx";
import s from "../Input/Input.module.css";
import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

  error?: FieldError | undefined;
}

export const TextArea = ({
  className,
  children,

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

  return (
    <div className={wrapperClassName}>
      <textarea
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        name={name}
        spellCheck="false"
        {...rest}
      />
    </div>
  );
};
