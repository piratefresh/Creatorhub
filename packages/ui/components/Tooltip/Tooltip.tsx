import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  children: React.ReactNode;
  showArrow?: boolean;
}

export const Tooltip = ({ children, showArrow = true }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button className="IconButton">
            <QuestionMarkCircleIcon className="h-5 w-5 text-white" />
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="rounded-lg border border-gray-500 bg-black p-3 text-gray-300"
            sideOffset={5}
          >
            {children}
            {showArrow && <TooltipPrimitive.Arrow className="bg-black" />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
