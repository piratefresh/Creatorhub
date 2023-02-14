import cn from "clsx";

export const Label = ({
  className,
  children,
  htmlFor,
  subLabel,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor: string;
  subLabel?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={cn("text-sm font-medium text-gray-300", className)}
        htmlFor={htmlFor}
      >
        {children}
      </label>
      {subLabel && (
        <span className="text-sm font-normal text-gray-300">{subLabel}</span>
      )}
    </div>
  );
};
