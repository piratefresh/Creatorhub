export const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) => {
  return (
    <label className="mb-2 text-sm font-medium text-gray-300" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
