import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Is it accessible?",
        children: (
          <div className="text-white">
            Yes. It adheres to the WAI-ARIA design pattern.
          </div>
        ),
      },
      {
        id: "2",
        title: "Is it unstyled?",
        children: (
          <div className="text-white">
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </div>
        ),
      },
    ],
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="relative flex h-[500px] max-w-7xl items-center justify-center">
        <Accordion items={args.items} />
      </div>
    );
  },
};
