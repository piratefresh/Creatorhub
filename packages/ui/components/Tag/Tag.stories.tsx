import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Tag",
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    children: "Comedy Movie",
  },
  parameters: {},
  render: (args) => {
    return <Tag>{args.children}</Tag>;
  },
};
