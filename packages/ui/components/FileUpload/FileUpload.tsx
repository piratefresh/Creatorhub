import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useDropzone, Accept } from "react-dropzone";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  accept?: Accept;
}

export const FileUpload = ({
  onChange,
  accept = {
    "image/*": [],
  },
}: FileUploadProps) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      onDrop: (files) => onChange(files),
    });
  return (
    <div className="container">
      <div
        className="flex flex-1 flex-col items-center rounded-lg border border-gray-500 p-5 text-gray-100 outline-none"
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <span className="rounded-full bg-white p-2">
          <ArrowUpTrayIcon className="h-5 w-5 text-black" />
        </span>
        <p>
          <span className="text-primary-600">Click to upload</span> or drag and
          drop SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    </div>
  );
};
