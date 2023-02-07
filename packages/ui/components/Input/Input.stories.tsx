import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import {
  EnvelopeIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../Button";
import { TextArea } from "../TextArea";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

interface PrimaryForm {
  firstName: string;
  lastName: string;
  description: string;
}

const Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  description: z.string().min(1),
});

export const Primary: Story = {
  render: (args) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<PrimaryForm>({
      resolver: zodResolver(Schema),
    });
    const onSubmit = (data: PrimaryForm) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="ml-4 flex max-w-5xl flex-row flex-wrap">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="firstName"
            >
              First name
            </label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input error={errors.firstName} {...field} />
              )}
            />
            {errors.firstName && (
              <p className="text-error-600" role="alert">
                First name is required
              </p>
            )}
          </div>
          <div className="ml-4 flex max-w-5xl flex-row flex-wrap">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="lastName"
            >
              Last name
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input error={errors.lastName} {...field} />
              )}
            />
            {errors.lastName && (
              <p className="text-error-600" role="alert">
                Last name is required
              </p>
            )}
          </div>
          <div className="ml-4 flex max-w-5xl flex-row flex-wrap">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="lastName"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea error={errors.description} {...field} />
              )}
            />
            {errors.lastName && (
              <p className="text-error-600" role="alert">
                Last name is required
              </p>
            )}
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    );
  },
};
export const Email: Story = {
  render: (args) => {
    return (
      <div className=" mt-4 ml-4 flex max-w-5xl flex-row flex-wrap">
        <label
          className="mb-2 text-sm font-medium text-gray-300"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          name="email"
          addonBefore={
            <i className="flex items-center justify-center rounded-l-lg border border-r-0 border-gray-300 px-[14px]">
              <EnvelopeIcon className="h-5 w-5 text-gray-300" />
            </i>
          }
          addonAfter={
            <i className="flex items-center justify-center rounded-r-lg border border-l-0 border-gray-300 px-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-300" />
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
          className="mb-2 text-sm font-medium text-gray-300"
          htmlFor="website"
        >
          Website
        </label>
        <Input
          name="website"
          addonBefore={
            <span className="flex items-center justify-center rounded-l-lg border border-r-0 border-gray-300 px-[14px] text-gray-300">
              Http://
            </span>
          }
          addonAfter={
            <i className="flex items-center justify-center rounded-r-lg border border-l-0 border-gray-300 px-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-300" />
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
          className="mb-2 text-sm font-medium text-gray-300"
          htmlFor="saleAmount"
        >
          Sale Amount
        </label>
        <Input
          name="saleAmount"
          addonBefore={
            <i className="flex items-center justify-center rounded-l-lg border border-r-0 border-gray-300 px-[14px]">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-300" />
            </i>
          }
          addonAfter={
            <i className="flex items-center justify-center rounded-r-lg border border-l-0 border-gray-300 px-[14px]">
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-300" />
            </i>
          }
        />
      </div>
    );
  },
};
