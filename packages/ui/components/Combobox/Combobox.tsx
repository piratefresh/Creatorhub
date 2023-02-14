import { useState } from "react";
import { Combobox as ComboboxPrimitive, Transition } from "@headlessui/react";
import React from "react";

export type Value = {
  id: string;
  name: string;
};

interface ComoboxProps {
  values: Value[];
  selected: Value[];
  onChange: (values: Value[]) => void;
}

export const Combobox = ({ values, onChange, selected }: ComoboxProps) => {
  const [query, setQuery] = useState("");
  const [createdValues, setCreatedValues] = useState([]);

  const filteredItems =
    query === ""
      ? values
      : [...values, ...createdValues].filter((value) => {
          return value.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleOnChange = (values: any) => {
    setCreatedValues((previousArr) => [
      ...previousArr,
      { id: query, name: query },
    ]);
    if (selected) {
      onChange(values);
    }
    setQuery("");
  };

  const options = filteredItems.map((item, index) => (
    <ComboboxPrimitive.Option key={index} value={item}>
      {({ selected, active }) => (
        <div
          className={`flex items-center px-3 py-2 text-sm font-medium ${
            active ? "bg-cyan-600" : ""
          } ${selected ? "" : "px-11"}`}
        >
          {item.name}
        </div>
      )}
    </ComboboxPrimitive.Option>
  ));

  console.log("values: ", values);

  console.log("filteredItems: ", filteredItems);

  return (
    <ComboboxPrimitive value={selected} onChange={handleOnChange} multiple>
      <div className="relative mt-1">
        <ComboboxPrimitive.Input
          className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-[10px] px-[14px] text-gray-100 focus:outline-none focus:ring-0"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(value: Value) => value.name}
        />
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxPrimitive.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-transparent py-1 text-base text-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.length > 0 ? (
              options
            ) : (
              <>
                {query.length > 0 && (
                  <ComboboxPrimitive.Option value={{ id: null, name: query }}>
                    Create "{query}"
                  </ComboboxPrimitive.Option>
                )}
                {filteredItems.map((value: Value) => (
                  <ComboboxPrimitive.Option key={value.id} value={value}>
                    {value.name}
                  </ComboboxPrimitive.Option>
                ))}
              </>
            )}
          </ComboboxPrimitive.Options>
        </Transition>
      </div>
    </ComboboxPrimitive>
  );
};
