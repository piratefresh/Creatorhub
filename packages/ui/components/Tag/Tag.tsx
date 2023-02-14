import { cn } from "../../utils/cn";

type DivProps = JSX.IntrinsicElements["div"];

interface TagProps extends DivProps {
  children: React.ReactNode;
  className?: string | undefined;
}

export const Tag = ({ children, className, ...props }: TagProps) => {
  const rootClassName = cn(
    "inline-flex rounded-md bg-gray-100 p-2 text-sm font-medium text-primary-900",
    className
  );
  return (
    <div className={rootClassName} {...props}>
      {children}
    </div>
  );
};
