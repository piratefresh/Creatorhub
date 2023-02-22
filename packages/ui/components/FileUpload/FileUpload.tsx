import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDropzone, Accept, DropzoneOptions } from "react-dropzone";

interface FileUploadProps extends DropzoneOptions {
  onChange: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
}

export const FileUpload = ({
  onChange,
  accept = {
    "image/*": [],
  },
  multiple,
}: FileUploadProps) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    accept,
    multiple: true,
  });

  React.useEffect(() => {
    if (acceptedFiles.length) {
      console.log("acceptedFiles: ", acceptedFiles);
      onChange(acceptedFiles);
    }
  }, [acceptedFiles]);

  console.log("acceptedFiles: ", acceptedFiles);

  return (
    <div className="container">
      <div
        className={`${
          isDragActive ? "border-dotted" : ""
        } flex flex-1 flex-col items-center rounded-lg border border-gray-500 p-5 text-gray-100 outline-none`}
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
