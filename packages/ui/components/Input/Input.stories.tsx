import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import {
  EnvelopeIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  render: (args) => {
    return (
      <div className=" mt-4 ml-4 flex max-w-5xl flex-row flex-wrap">
        <label className="mb-2 text-sm font-medium text-white" htmlFor="email">
          Email
        </label>
        <Input
          name="email"
          addonBefore={
            <i className="flex items-center rounded-l-lg bg-white pl-[14px]">
              <EnvelopeIcon className="h-5 w-5 text-black" />
            </i>
          }
          addonAfter={
            <i className="flex items-center rounded-r-lg bg-white pr-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-black" />
            </i>
          }
        />
      </div>
    );
  },
};
export const Hint: Story = {
  render: (args) => {
    return (
      <div className=" mt-4 ml-4 flex max-w-5xl flex-row flex-wrap">
        <label
          className="mb-2 text-sm font-medium text-white"
          htmlFor="website"
        >
          Website
        </label>
        <Input
          name="website"
          addonBefore={
            <span className="flex items-center rounded-l-lg border-r bg-white px-[14px]">
              Http://
            </span>
          }
          addonAfter={
            <i className="flex items-center rounded-r-lg bg-white pr-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-black" />
            </i>
          }
        />
      </div>
    );
  },
};
export const SaleAmount: Story = {
  render: (args) => {
    return (
      <div className=" mt-4 ml-4 flex max-w-5xl flex-row flex-wrap">
        <label
          className="mb-2 text-sm font-medium text-white"
          htmlFor="saleAmount"
        >
          Sale Amount
        </label>
        <Input
          name="saleAmount"
          addonBefore={
            <i className="flex items-center rounded-l-lg bg-white pl-[14px]">
              <CurrencyDollarIcon className="h-5 w-5 text-black" />
            </i>
          }
          addonAfter={
            <i className="flex items-center rounded-r-lg bg-white pr-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-black" />
            </i>
          }
        />
      </div>
    );
  },
};
