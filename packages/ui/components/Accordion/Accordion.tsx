import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";
import cn from "clsx";
import {
  AccordionContentProps,
  AccordionTriggerProps,
} from "@radix-ui/react-accordion";
import s from "./Accordion.module.css";

interface ItemProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

interface AccordionProps {
  items: ItemProps[];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root
      className="flex w-full flex-col gap-4"
      type="multiple"
    >
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.children}</AccordionContent>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

export const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: AccordionTriggerProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const triggerClassName = cn(
      s.AccordionTrigger,
      "flex w-full flex-row justify-between text-white",
      {},
      className
    );
    const chavronClassName = cn(s.AccordionChevron, "h-5 w-5", {}, className);
    return (
      <AccordionPrimitive.Header className={cn(className)}>
        <AccordionPrimitive.Trigger
          className={triggerClassName}
          {...props}
          ref={forwardedRef}
        >
          {children}
          <ChevronDownIcon className={chavronClassName} aria-hidden />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);

export const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: AccordionContentProps,
    forwardedRef: React.Ref<HTMLDivElement> | undefined
  ) => (
    <AccordionPrimitive.Content
      className={cn("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </AccordionPrimitive.Content>
  )
);

export { AccordionPrimitive };
