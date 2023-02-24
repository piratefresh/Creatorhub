import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import geocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import mbxClient from "@mapbox/mapbox-sdk";
import React from "react";

export type SelectValue = {
  value: string;
  name: string;
  [key: string]: any;
};

interface SelectProps {
  options: SelectValue[];
  value: SelectValue;
  onSelect: (value: SelectValue) => void;
  onChange: (query: string) => void;
}

export function Select({ options, value, onSelect, onChange }: SelectProps) {
  return (
    <Combobox value={value} onChange={onSelect}>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full appearance-none rounded-lg border border-gray-300 bg-darkPurple py-[10px] px-[14px] text-gray-100 focus:outline-none focus:ring-0"
          onChange={(event) => onChange(event.target.value)}
          displayValue={(option: SelectValue) => option?.name}
        />
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-darkPurple py-1 text-base text-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((value: SelectValue) => (
              <Combobox.Option key={value.name} value={value}>
                {({ selected, active }) => (
                  <div
                    className={`relative flex items-center px-3 py-2 text-sm font-medium ${
                      active ? "bg-gray-900" : ""
                    }`}
                  >
                    {value.name}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
