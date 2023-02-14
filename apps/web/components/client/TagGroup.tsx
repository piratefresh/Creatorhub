"use client";

import React from "react";
import { Combobox, Tag, Value } from "ui";

interface TagGroupProps {
  onChange: (values: Value[]) => void;
  selected: Value[];
  onRemove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TagGroup = ({ onChange, onRemove, selected }: TagGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-4">
        {selected.length > 0 && (
          <ul className="flex flex-row flex-wrap gap-4 text-white">
            {selected.map((value: Value) => (
              <Tag key={value.id} data-value={value.name} onClick={onRemove}>
                {value.name}
              </Tag>
            ))}
          </ul>
        )}
      </div>
      <Combobox values={[]} selected={selected} onChange={onChange} />
    </div>
  );
};
