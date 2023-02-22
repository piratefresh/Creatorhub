export function getResourceType(file: File): string {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp4":
    case "webm":
    case "mov":
      return "video";
    default:
      return "raw";
  }
}
