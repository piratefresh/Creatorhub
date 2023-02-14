import React, { useState } from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";
import { useDropzone } from "react-dropzone";

const meta: Meta<typeof FileUpload> = {
  title: "FileUpload",
  component: FileUpload,
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Primary: Story = {
  args: {},
  parameters: {},
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div className="relative flex h-[500px] max-w-7xl flex-col items-center justify-center gap-4">
        <FileUpload onChange={setFiles} />
        <ul className="text-gray-300">
          {files.map((file) => (
            <li className="flex flex-col items-center" key={file.name}>
              <img
                className="h-32 w-32 object-cover"
                src={URL.createObjectURL(file)}
              />
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
