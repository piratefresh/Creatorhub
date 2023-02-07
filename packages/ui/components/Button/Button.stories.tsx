import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="flex max-w-5xl flex-row flex-wrap justify-center gap-8">
        <Button size="sm">{args.children} sm</Button>
        <Button size="md">{args.children} md</Button>
        <Button size="lg">{args.children} lg</Button>
        <Button size="xl">{args.children} xl</Button>
        <Button size="2xl">{args.children} 2xl</Button>
        <Button variant="flat" size="sm">
          {args.children} flat
        </Button>
        <Button variant="ghost" size="md">
          {args.children} ghost
        </Button>
        <Button variant="naked" size="lg">
          {args.children} naked
        </Button>
        <Button variant="slim" size="xl">
          {args.children} slim
        </Button>
        <Button variant="primary" size="xl">
          {args.children} primary
        </Button>
        <Button disabled size="2xl">
          {args.children} disabled
        </Button>
        <Button loading size="2xl">
          {args.children} loading
        </Button>
      </div>
    );
  },
};
export const sm: Story = {
  args: {
    children: "Click Me",
    size: "sm",
  },
  parameters: {},
  render: (args) => {
    return <Button size={args.size}>{args.children}</Button>;
  },
};
export const md: Story = {
  args: {
    children: "Click Me",
    size: "md",
  },
  parameters: {},
  render: (args) => {
    return <Button size={args.size}>{args.children}</Button>;
  },
};
export const lg: Story = {
  args: {
    children: "Click Me",
    size: "lg",
  },
  parameters: {},
  render: (args) => {
    return <Button size={args.size}>{args.children}</Button>;
  },
};
export const xl: Story = {
  args: {
    children: "Click Me",
    size: "xl",
  },
  parameters: {},
  render: (args) => {
    return <Button size={args.size}>{args.children}</Button>;
  },
};
export const twoXl: Story = {
  args: {
    children: "Click Me",
    size: "2xl",
  },
  parameters: {},
  render: (args) => {
    return <Button size={args.size}>{args.children}</Button>;
  },
};
