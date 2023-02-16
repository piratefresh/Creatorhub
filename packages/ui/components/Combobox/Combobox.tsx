import { useState } from "react";
import { Combobox as ComboboxPrimitive, Transition } from "@headlessui/react";
import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export type Value = {
  id: string;
  name: string;
};

interface ComoboxProps {
  values: Value[];
  selected: Value[];
  onChange: (values: Value[]) => void;
  placeholder?: string;
}

export const Combobox = ({
  values,
  onChange,
  selected,
  placeholder,
}: ComoboxProps) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? [...new Set([...values, ...selected])]
      : [...new Set([...values, ...selected])].filter((value) => {
          return value.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleOnChange = (values: any) => {
    if (selected) {
      onChange(values);
    }
    setQuery("");
  };

  const options = filteredItems.map((item, index) => (
    <ComboboxPrimitive.Option key={index} value={item}>
      {({ selected, active }) => (
        <div
          className={`relative flex px-3 py-2 pl-10 text-sm font-medium ${
            active ? "bg-gray-900" : ""
          }`}
        >
          {selected ? (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                active ? "text-white" : "text-teal-600"
              }`}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
          {item.name}
        </div>
      )}
    </ComboboxPrimitive.Option>
  ));

  return (
    <ComboboxPrimitive value={selected} onChange={handleOnChange} multiple>
      <div className="relative mt-1">
        <ComboboxPrimitive.Input
          placeholder={placeholder}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-darkPurple py-[10px] px-[14px] text-gray-100 focus:outline-none focus:ring-0"
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
          <ComboboxPrimitive.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-darkPurple py-1 text-base text-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.length > 0 ? (
              options
            ) : (
              <>
                {query.length > 0 && (
                  <ComboboxPrimitive.Option
                    value={{ id: null, name: query }}
                    key={query}
                  >
                    {({ selected, active }) => (
                      <div
                        className={`flex px-3 py-2 text-sm font-medium ${
                          active ? "bg-gray-900" : ""
                        }`}
                      >
                        Create "{query}"
                      </div>
                    )}
                  </ComboboxPrimitive.Option>
                )}
                {filteredItems.map((value: Value) => (
                  <ComboboxPrimitive.Option key={value.name} value={value}>
                    {({ selected, active }) => (
                      <div
                        className={`relative flex items-center px-3 py-2 pl-10 text-sm font-medium ${
                          active ? "bg-gray-900" : ""
                        }`}
                      >
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                        {value.name}
                      </div>
                    )}
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
