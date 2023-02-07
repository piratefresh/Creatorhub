import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    return <Badge variant={args.variant}>{args.children}</Badge>;
  },
};
export const Error: Story = {
  args: {
    children: "Click Me",
    variant: "error",
  },
  parameters: {},
  render: (args) => {
    return <Badge variant={args.variant}>{args.children}</Badge>;
  },
};
export const Success: Story = {
  args: {
    children: "Click Me",
    variant: "success",
  },
  parameters: {},
  render: (args) => {
    return <Badge variant={args.variant}>{args.children}</Badge>;
  },
};
export const warning: Story = {
  args: {
    children: "Click Me",
    variant: "warning",
  },
  parameters: {},
  render: (args) => {
    return <Badge variant={args.variant}>{args.children}</Badge>;
  },
};
