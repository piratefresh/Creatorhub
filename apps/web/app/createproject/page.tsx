import React from "react";
import { Input, Label, TextArea } from "ui";
import { LocationTypeCheckGroup } from "../../components/client/LocationTypeCheckGroup";

export default async function Page() {
  return (
    <div className="flex flex-col p-5">
      <h1 className="pinkPurpleGradientText text-display-md text-white">
        CREATE PROJECT
      </h1>

      <div className="flex flex-col">
        <Label htmlFor="title">Project Title</Label>
        <Input name="title" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="description">Project Description</Label>
        <TextArea name="description" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="location">Location</Label>
        <Input name="location" />
      </div>

      <LocationTypeCheckGroup />
    </div>
  );
}
