import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="mx-w-7xl relative flex h-[500px] items-center justify-center">
        <Tooltip>
          <div className="max-w-xs">
            <h1>This is a tooltip</h1>
            <p>
              Tooltips are used to describe or identify an element. In most
              scenarios, tooltips help the user understand the meaning, function
              or alt-text of an element.
            </p>
          </div>
        </Tooltip>
      </div>
    );
  },
};
