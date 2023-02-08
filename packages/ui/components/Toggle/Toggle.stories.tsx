import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Toggle",
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="flex items-center gap-4">
        <Toggle name="remember-me" />
        <label
          className="flex flex-col text-sm font-bold text-gray-300"
          htmlFor="remember-me"
        >
          Remember me?
          <span className="font-normal text-gray-300">
            Save my login details for next time.
          </span>
        </label>
      </div>
    );
  },
};
