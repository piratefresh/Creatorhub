import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Modal = ({
  icon,
  className,
  children,
  title,
  description,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed" />
        <Dialog.Content
          className={
            "fixed top-1/2 left-1/2 flex flex-col gap-5 rounded-md p-5 " +
            className
          }
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="flex items-center justify-between">
            {icon && (
              <div className="grid h-12 w-12 place-items-center items-center rounded-full bg-success-50">
                {icon}
              </div>
            )}
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <XMarkIcon className="h-4 w-4 cursor-pointer text-gray-100" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex">
            <div className="flex flex-col">
              <Dialog.Title className="text-lg font-semibold text-gray-100">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-gray-300">
                {description}
              </Dialog.Description>
            </div>
          </div>

          {children}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          ></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
