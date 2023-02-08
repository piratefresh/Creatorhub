import Image from "next/image";
import cn from "clsx";
import s from "./Avatar.module.css";

interface AvatarProps {
  className?: string;
  showStatus?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  statusIcon?: React.ReactNode;
  src: string;
}

export const Avatar = ({
  className,
  showStatus = false,
  size = "lg",
  statusIcon,
  src,
}: AvatarProps) => {
  const wrapperClassName = cn(s.wrapper, {
    [s.xs]: size === "xs",
    [s.sm]: size === "sm",
    [s.md]: size === "md",
    [s.lg]: size === "lg",
    [s.xl]: size === "xl",
    [s.xxl]: size === "2xl",
  });
  const rootClassName = cn(s.root, {}, className);
  const statusClassName = cn(s.status, {
    [s.statusXs]: size === "xs",
    [s.statusSm]: size === "sm",
    [s.statusMd]: size === "md",
    [s.statusLg]: size === "lg",
    [s.statusXl]: size === "xl",
    [s.statusXxl]: size === "2xl",
  });
  return (
    <div className={wrapperClassName}>
      <Image alt="avatar" className={rootClassName} src={src} fill />
      {statusIcon && <div className={statusClassName}>{statusIcon}</div>}
    </div>
  );
};

export const OnlineStatusIndicator = ({
  className,
  isOnline,
}: {
  isOnline: boolean;
  className: string;
}) => {
  const onlineClass = "h-full w-full rounded-full bg-success-500";
  const offlineClasses = "h-full w-full rounded-full bg-error-500";
  const rootClassName = cn(
    s.root,
    {
      [onlineClass]: isOnline,
      [offlineClasses]: !isOnline,
    },
    className
  );
  return <div className={rootClassName} />;
};
