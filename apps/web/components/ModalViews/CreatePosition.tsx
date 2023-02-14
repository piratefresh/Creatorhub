"use client";

import { Button, Input, Modal, TextArea } from "ui";
import { Control, Controller, useForm } from "react-hook-form";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Position } from "app/createproject/page";

interface CreatePositionModalProps {
  onConfirm: (value: Position) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  title: string;
  description: string;
}

interface PrimaryForm {
  title: string;
  description: string;
}

const Schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const CreatePosition = ({
  onConfirm,
  setOpen,
  open,
  title,
  description,
}: CreatePositionModalProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PrimaryForm>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: PrimaryForm) => onConfirm(data);

  return (
    <Modal
      className="bg- w-full max-w-sm border border-gray-500 bg-darkPurple"
      open={open}
      onOpenChange={setOpen}
      icon={<AcademicCapIcon className="h-7 w-7 text-success-600" />}
      title={title}
      description={description}
    >
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row flex-wrap md:max-w-5xl">
          <label
            className="mb-2 text-sm font-medium text-gray-300"
            htmlFor="password"
          >
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input error={errors.title} {...field} />}
          />
          {errors.title && (
            <p className="text-error-600" role="alert">
              Current password is required
            </p>
          )}
        </div>
        <div className="flex max-w-5xl flex-row flex-wrap">
          <label
            className="mb-2 text-sm font-medium text-gray-300"
            htmlFor="description"
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea error={errors.description} {...field} />
            )}
          />
          {errors.description && (
            <p className="text-error-600" role="alert">
              New password is required
            </p>
          )}
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button className="inline-flex self-start" variant="primary">
            Save
          </Button>
          <Button
            className="inline-flex self-start"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
