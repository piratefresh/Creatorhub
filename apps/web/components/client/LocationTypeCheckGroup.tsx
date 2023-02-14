"use client";

import {
  CircleStackIcon,
  FireIcon,
  LightBulbIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { CheckboxGroupRoot, CheckboxGroupItem, Checkbox } from "ui";

const Items = [
  {
    title: "On Site",
    description: "",
    icon: <ServerIcon className="h-6 w-6" />,
    value: "On Site",
  },
  {
    title: "Hybrid",
    description: "",
    icon: <FireIcon className="h-6 w-6" />,
    value: "Hybrid",
  },
  {
    title: "Remote",
    description: "",
    icon: <LightBulbIcon className="h-6 w-6" />,
    value: "Remote",
  },
];

export const LocationTypeCheckGroup = () => {
  const [locationType, setLocationType] = React.useState("");
  return (
    <CheckboxGroupRoot
      type="single"
      className="inline-flex flex-col gap-2"
      value={locationType}
      onValueChange={(value) => {
        setLocationType(value as string);
      }}
    >
      {Items.map((item) => {
        const isChecked = item.value === locationType;

        return (
          <CheckboxGroupItem
            className="inline-flex rounded-md border border-primary-600 py-3 px-4 text-text-md"
            value={item.value}
            aria-label={item.value}
            key={item.value}
            isChecked={isChecked}
          >
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center rounded-full p-2 ${
                    isChecked
                      ? "bg-primary-600 text-gray-300"
                      : "bg-gray-100 text-primary-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-gray-100">
                  <h1>{item.title}</h1>
                </div>
              </div>

              {/* <Checkbox
                size="md"
                variant="circle"
                className=""
                checked={isChecked}
              /> */}
            </div>
          </CheckboxGroupItem>
        );
      })}
    </CheckboxGroupRoot>
  );
};
