"use client";

import { Button, Input, Label, Modal, TextArea, Value } from "ui";
import { Control, Controller, useForm } from "react-hook-form";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Position } from "@prisma/client";
import { TagGroup } from "@components/client/TagGroup";
import React from "react";
import { PositionWithSkill } from "types/index.t";

interface CreatePositionModalProps {
  onConfirm: (newPositions: PositionWithSkill) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
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
    formState: { errors },
  } = useForm<PositionWithSkill>({
    defaultValues: {
      skills: [],
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: PositionWithSkill) => onConfirm(data);

  const [tags, setTags] = React.useState<Value[]>([]);

  const handleRemoveTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = e.currentTarget.dataset.value;

    const filteredTags = tags.filter((skill) => skill.name !== value);

    setTags(filteredTags);
  };

  return (
    <Modal
      className="w-full max-w-sm border border-gray-500 bg-darkPurple font-sans"
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
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input error={errors.title} {...field} />}
          />
          {errors.title && (
            <p className="text-error-600" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="flex max-w-5xl flex-row flex-wrap">
          <Label htmlFor="description">Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea error={errors.description} {...field} />
            )}
          />
          {errors.description && (
            <p className="text-error-600" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Label
            htmlFor="tags"
            subLabel="Tags help people find your project easier via search."
          >
            Tags
          </Label>

          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <TagGroup
                onChange={field.onChange}
                selected={field.value}
                onRemove={handleRemoveTag}
                placeholder="Create tag"
              />
            )}
          />
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
