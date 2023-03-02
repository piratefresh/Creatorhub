import ReactMasonry, {
  MasonryProps as ReactMasonryProps,
} from "react-masonry-css";

interface MasonryProps extends ReactMasonryProps {
  children: React.ReactNode;
}

export const Masonry = ({ children, ...props }: MasonryProps) => {
  return <ReactMasonry {...props}>{children}</ReactMasonry>;
};
