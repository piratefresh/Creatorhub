import {
  DocumentIcon,
  MusicalNoteIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../utils/cn";

type FileTypeIconProps = {
  fileType?: string;
  className?: string;
};

export function FileTypeIcon({ className, fileType }: FileTypeIconProps) {
  switch (fileType) {
    case "pdf":
      return <DocumentIcon className={cn(className, "h-5 w-5")} />;
    case "mp3":
    case "wav":
      return <MusicalNoteIcon className={cn(className, "h-5 w-5")} />;
    case "jpg":
    case "jpeg":
    case "png":
      return <PhotoIcon className={cn(className, "h-5 w-5")} />;
    case "mp4":
    case "avi":
      return <VideoCameraIcon className={cn(className, "h-5 w-5")} />;
    default:
      return <DocumentIcon className={cn(className, "h-5 w-5")} />;
  }
}
