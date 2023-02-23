export function getResourceType(file: File): string {
  console.log("file: ", file);
  const type = types(file.type);
  console.log("type: ", type);
  switch (type) {
    case "image":
      return "image";
    case "video":
      return "video";
    default:
      return "raw";
  }
}

function types(fileType: string) {
  if (fileType.includes("image")) {
    return "image";
  }
  if (fileType.includes("video")) {
    return "video";
  }
}
