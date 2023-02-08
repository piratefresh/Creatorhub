import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="flex items-center gap-2">
        <Checkbox />
        <label
          className="flex flex-col text-sm font-bold text-gray-300"
          htmlFor="c1"
        >
          Accept terms and conditions.
        </label>
      </div>
    );
  },
};
