import React, { useState } from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, Value } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const values = [
  { id: "1", name: "Durward Reynolds" },
  { id: "2", name: "Kenton Towne" },
  { id: "3", name: "Therese Wunsch" },
  { id: "4", name: "Benedict Kessler" },
  { id: "5", name: "Katelyn Rohan" },
];

export const Primary: Story = {
  args: {},
  parameters: {},
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<Value[]>([]);
    return (
      <div className="relative flex h-[500px] max-w-7xl flex-col items-center justify-center gap-4">
        {selectedValues.length > 0 && (
          <ul className="text-white">
            {selectedValues.map((value: Value) => (
              <li key={value.id}>{value.name}</li>
            ))}
          </ul>
        )}
        <Combobox
          values={values}
          selected={selectedValues}
          onChange={setSelectedValues}
        />
      </div>
    );
  },
};
