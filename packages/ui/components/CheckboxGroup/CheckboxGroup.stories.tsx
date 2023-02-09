import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroupItem, CheckboxGroupRoot } from "./CheckboxGroup";
import { CircleStackIcon, FireIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof CheckboxGroupRoot> = {
  title: "CheckboxGroupRoot",
  component: CheckboxGroupRoot,
};

export default meta;
type Story = StoryObj<typeof CheckboxGroupRoot>;

const Items = [
  {
    title: "Basic plan $10/month",
    description:
      "Includes up to 10 users, 20GB indiviual data and access to all features.",
    icon: <CircleStackIcon className="h-8 w-8" />,
    value: "1",
  },
  {
    title: "Business plan $20/month",
    description:
      "Includes up to 20 users, 40GB indiviual data and access to all features.",
    icon: <FireIcon className="h-8 w-8" />,
    value: "2",
  },
];

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <CheckboxGroupRoot
        type="single"
        className="inline-flex flex-col gap-2"
        value={value}
        onValueChange={(value) => {
          setValue(value as string);
        }}
      >
        {Items.map((item) => {
          const isChecked = item.value === value;

          return (
            <CheckboxGroupItem
              className="inline-flex rounded-md border border-primary-600 py-3 px-4 text-text-md"
              value={item.value}
              aria-label={item.value}
              key={item.value}
              isChecked={isChecked}
            >
              <div className="flex flex-row items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isChecked
                      ? "bg-primary-600 text-gray-300"
                      : "bg-gray-100 text-primary-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-gray-100">
                  <h1>{item.title}</h1>
                  <p className="text-gray-300">{item.description}</p>
                </div>
                <Checkbox checked={isChecked} />
              </div>
            </CheckboxGroupItem>
          );
        })}
      </CheckboxGroupRoot>
    );
  },
};
