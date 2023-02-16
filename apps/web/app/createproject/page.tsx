"use client";

import { TagGroup } from "@components/client/TagGroup";
import { CreatePosition } from "@components/ModalViews/CreatePosition";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPrimitive,
  AccordionTrigger,
  Button,
  FileUpload,
  Input,
  Label,
  TextArea,
  Toggle,
  Value,
} from "ui";
import { LocationTypeCheckGroup } from "../../components/client/LocationTypeCheckGroup";

export interface Position {
  title: string;
  description: string;
}

export default function CreateProjectPage() {
  const [openModal, setOpenModal] = React.useState(false);
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [images, setImages] = React.useState<File[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [tags, setTags] = React.useState<Value[]>([]);

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleAddPosition = (newPositions: Position) => {
    setPositions((prevArray) => [...prevArray, newPositions]);
    setOpenModal(false);
  };

  const getRandomImage = async () => {
    const res = await fetch(
      "https://source.unsplash.com/random/900×700/?abstract"
    );

    const contentType = res.headers.get("content-type");
    console.log("contentType: ", contentType);
    const blob = await res.blob();
    const file = new File([blob], "randomImage", {
      // @ts-ignore
      contentType,
    });
    setImages([file]);
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = e.currentTarget.dataset.value;
    console.log("value: ", value);
    const filteredTags = tags.filter((tag) => tag.name !== value);
    console.log("filteredTags: ", filteredTags);
    setTags(filteredTags);
  };

  console.log("files: ", files);

  return (
    <div className="flex flex-col gap-8 p-5">
      <h1 className="pinkPurpleGradientText text-display-md font-bold text-white">
        Create project
      </h1>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Project Title</Label>
        <Input name="title" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Project Description</Label>
        <TextArea name="description" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="location">Location</Label>
        <Input name="location" />
      </div>

      <LocationTypeCheckGroup />

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="projectPhoto"
          subLabel="The photo that will be used for your project."
        >
          Project Photo
        </Label>

        {images.map((image) => (
          <img
            className="h-32 w-full rounded-lg object-cover"
            src={URL.createObjectURL(image)}
          />
        ))}
        <FileUpload accept={{ "image/*": [] }} onChange={setImages} />
        <Button
          className="self-start"
          variant="primary"
          onClick={getRandomImage}
        >
          Random Image
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Toggle name="isActive" />

        <Label
          className="font-semibold text-gray-300"
          htmlFor="isActive"
          subLabel="Save my login details for next time."
        >
          In Production
        </Label>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="isActive" subLabel="Some of the positions you need.">
            Positions
          </Label>
          <button onClick={handleOpenModal}>
            <PlusCircleIcon className="h-5 w-5 cursor-pointer text-white" />
          </button>
        </div>
      </div>

      {positions.map((pos) => (
        <AccordionItem
          className="relative rounded-lg border border-gray-600"
          id={pos.title}
          value={pos.title}
        >
          <div className="whiteGradientOverlay" />
          <AccordionTrigger>{pos.title}</AccordionTrigger>
          <AccordionContent className="whitespace-pre-wrap py-2 px-3 text-gray-300">
            {pos.description}
          </AccordionContent>
        </AccordionItem>
      ))}

      <div className="flex flex-col gap-4">
        <Label
          htmlFor="tags"
          subLabel="Tags help people find your project easier via search."
        >
          Tags
        </Label>

        <TagGroup
          onChange={setTags}
          selected={tags}
          onRemove={handleRemoveTag}
          placeholder="Create tag"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="projectPhoto"
          subLabel="Add files to help talents get better understanding of your project."
        >
          Files
        </Label>

        <FileUpload
          accept={{ "image/*": [], "text/*": [], "application/pdf": [] }}
          onChange={setImages}
        />
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>

      <CreatePosition
        onConfirm={handleAddPosition}
        open={openModal}
        setOpen={setOpenModal}
        title="Add Position"
        description="Add an required position to start the project. Reminder this is not a professional job board, but for side projects/non-professional projects."
      />
    </div>
  );
}
