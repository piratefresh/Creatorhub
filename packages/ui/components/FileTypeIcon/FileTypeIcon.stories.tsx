import React, { useState } from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { FileTypeIcon } from "./FileTypeIcon";

const meta: Meta<typeof FileTypeIcon> = {
  title: "FileTypeIcon",
  component: FileTypeIcon,
};

export default meta;
type Story = StoryObj<typeof FileTypeIcon>;

export const Primary: Story = {
  args: {},
  parameters: {},
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return <FileTypeIcon />;
  },
};
