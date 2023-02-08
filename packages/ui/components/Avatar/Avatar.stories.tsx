import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, OnlineStatusIndicator } from "./Avatar";
import Image from "next/image";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: "https://source.unsplash.com/random",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="relative flex w-screen flex-row justify-between gap-4">
        <div className="relative h-full w-full">
          <Avatar size="xs" src={args.src} />
        </div>
        <div className="relative h-full w-full">
          <Avatar size="sm" src={args.src} />
        </div>
        <div className="relative h-full w-full">
          <Avatar size="md" src={args.src} />
        </div>
        <div className="relative h-full w-full">
          <Avatar size="lg" src={args.src} />
        </div>
        <div className="relative h-full w-full">
          <Avatar size="xl" src={args.src} />
        </div>
        <div className="relative h-full w-full">
          <Avatar size="2xl" src={args.src} />
        </div>
      </div>
    );
  },
};
export const Status: Story = {
  args: {
    src: "https://source.unsplash.com/random",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="relative flex w-screen flex-row justify-between gap-4">
        <Avatar
          size="xs"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={false} />}
        />

        <Avatar
          size="sm"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={false} />}
        />

        <Avatar
          size="md"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={false} />}
        />

        <Avatar
          size="lg"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={true} />}
        />

        <Avatar
          size="xl"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={true} />}
        />

        <Avatar
          size="2xl"
          src={args.src}
          statusIcon={<OnlineStatusIndicator isOnline={true} />}
        />
      </div>
    );
  },
};
export const Company: Story = {
  args: {
    src: "https://source.unsplash.com/random",
  },
  parameters: {},
  render: (args) => {
    return (
      <div className="relative flex w-screen flex-row justify-between gap-4">
        <Avatar
          size="xs"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />

        <Avatar
          size="sm"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />

        <Avatar
          size="md"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />

        <Avatar
          size="lg"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />

        <Avatar
          size="xl"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />

        <Avatar
          size="2xl"
          src={args.src}
          statusIcon={
            <Image
              className="rounded-full"
              src="images/Layers.svg"
              alt="company"
              fill
            />
          }
        />
      </div>
    );
  },
};
