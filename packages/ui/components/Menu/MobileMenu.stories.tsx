import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { MobileMenu } from "./MobileMenu";

const meta: Meta<typeof MobileMenu> = {
  title: "MobileMenu",
  component: MobileMenu,
};

export default meta;
type Story = StoryObj<typeof MobileMenu>;

export const Primary: Story = {
  args: {},
  parameters: {},
};
