import cn from "clsx";
import s from "./Card.module.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  const rootClassName = cn(s.root, {}, className);
  return <div className={rootClassName}>{children}</div>;
};
