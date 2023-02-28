"use client";

import { LocationTypeCheckGroup } from "@components/client/LocationTypeCheckGroup";
import { createOption, TagGroup } from "@components/client/TagGroup";
import { getRootLayout } from "@components/layouts/rootLayout";
import { CreatePosition } from "@components/ModalViews/CreatePosition";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  FileTypeIcon,
  FileUpload,
  Input,
  Label,
  TextArea,
  Toggle,
  Value,
} from "ui";
import { ProjectForm, PositionWithSkill } from "types/index.t";
import Image from "next/image";
import { humanFileSize } from "@utils/humanFileSize";
import { cloudinary } from "@server/cloudinary";
import { api } from "@utils/api";
import { toBase64 } from "@utils/base64";
import { uploadFile } from "@utils/cloudinary";
import { Geocoder } from "../components/geocoder";

export default function CreateProjectPage() {
  const { control, handleSubmit, setValue, watch } = useForm<ProjectForm>({
    defaultValues: {
      inProduction: false,
      positions: [],
      tags: [],
    },
  });

  const [images, setImages] = React.useState<File[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [tags, setTags] = React.useState<Value[]>([]);

  const handleOpenModal = () => setOpenModal(!openModal);

  const positions = useWatch({ control, name: "positions" });
  const image = useWatch({ control, name: "image" });

  const allValues = watch();

  const createProject = api.project.createProject.useMutation();
  const onSubmit = async (data: ProjectForm) => {
    console.log("data: ", data);
    const image = await uploadFile(images[0]!);
    let filesUrl: string[];

    if (files) {
      const filesPromises = files.map(async (file) => {
        const newFileObj = await uploadFile(file);
        return newFileObj.url;
      });
      filesUrl = await Promise.all(filesPromises);
    }

    createProject.mutate({
      ...data,
      image: image.url,
      files: filesUrl,
      published: true,
      timezone: "EST",
      category: "",
    });
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleAddPosition = (newPositions: PositionWithSkill) => {
    setValue("positions", [...positions, newPositions]);
    setOpenModal(false);
  };

  const getRandomImage = async () => {
    const res = await fetch(
      "https://source.unsplash.com/random/900×700/?abstract"
    );

    const contentType = res.headers.get("content-type");
    const blob = await res.blob();
    const file = new File([blob], "randomImage", {
      type: contentType ?? "image/jpeg",
    });
    const imageUrl = URL.createObjectURL(file);
    setImages([file]);
    setValue("image", imageUrl);
  };

  const setImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImages([file]);
    setValue("image", imageUrl);
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = e.currentTarget.dataset.value;

    const filteredTags = tags.filter((tag) => tag.name !== value);

    setTags(filteredTags);
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value = e.currentTarget.value;
    const filteredFiles = files.filter((file) => file.name !== value);

    console.log("value: ", value);

    setFiles(filteredFiles);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8 p-5">
        <h1 className="pinkPurpleGradientText text-display-md font-bold text-white">
          Create project
        </h1>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Project Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input onChange={field.onChange} />}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Project Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea onChange={field.onChange} cols={6} />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Geocoder
                onChange={(location) => {
                  setValue("lat", location.lat);
                  setValue("lng", location.lng);
                  setValue("city", location.city);
                  setValue("state", location.region ?? "");

                  field.onChange(location.value);
                }}
              />
            )}
          />
        </div>

        <Controller
          name="locationType"
          control={control}
          render={({ field }) => (
            <LocationTypeCheckGroup onChange={field.onChange} />
          )}
        />

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="projectPhoto"
            subLabel="The photo that will be used for your project."
          >
            Project Photo
          </Label>

          {image && (
            <div className="relative h-32 w-full">
              <Image
                alt="project image"
                className="rounded-lg object-cover"
                fill
                src={image}
              />
            </div>
          )}
          <FileUpload
            accept={{ "image/*": [] }}
            onChange={(files) => setImage(files[0])}
          />
          <Button
            className="self-start"
            variant="primary"
            onClick={getRandomImage}
            type="button"
          >
            Random Image
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Controller
            name="inProduction"
            control={control}
            render={({ field }) => (
              <Toggle name="inProduction" onChange={field.onChange} />
            )}
          />

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
            <Label
              htmlFor="isActive"
              subLabel="Some of the positions you need."
            >
              Positions
            </Label>
            <button onClick={handleOpenModal} type="button">
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

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagGroup
                onChange={(values) => {
                  const newTags = values.map((value) => value.name);
                  field.onChange(newTags);
                }}
                selected={field.value.map((value) => createOption(value))}
                onRemove={handleRemoveTag}
                placeholder="Create tag"
              />
            )}
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
            multiple
            onChange={(newFiles) => setFiles([...files, ...newFiles])}
          />
          <ul className="flex flex-col gap-4 text-gray-300">
            {files.map((file) => (
              <li
                className="flex flex-row justify-between rounded-md border border-gray-500 p-4"
                key={file.name}
              >
                <div className="flex gap-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <FileTypeIcon fileType={file.type} />
                  </div>

                  <div className="flex flex-col self-start">
                    <h4>{file.name}</h4>

                    <span className="text-gray-500">
                      {humanFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button value={file.name} onClick={handleRemoveFile}>
                  <TrashIcon className="h-5 w-5 text-gray-500" />
                </button>
              </li>
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
      <Button type="submit">Create Project</Button>
      <DevTool control={control} /> set up the dev tool
    </form>
  );
}

CreateProjectPage.getLayout = getRootLayout;
