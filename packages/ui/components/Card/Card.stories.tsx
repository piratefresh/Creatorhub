import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "./Card";
import { Badge } from "../Badge";
import {
  Accordion,
  AccordionContent,
  AccordionPrimitive,
  AccordionTrigger,
} from "../Accordion";
import Image from "next/image";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

const PROJECT_DATA = [
  {
    title: "Peter Pan Goes Wrong",
    shortDescription:
      "Casting 'Stormy Feathers,' a romantic comedy independent feature version of an award-winning short film.",
    updatedAt: new Date(),
    location: "Philadelphia, PA",
    positions: [
      {
        title: "Director",
      },
    ],
    status: "In Progress",
  },
];

const BLOG_DATA = [
  {
    imageUrl: "https://source.unsplash.com/random",
    title: "Peter Pan Goes Wrong",
    category: "General",
    shortDescription:
      "Working together is key! Learn how to foster team collaboration and maximize productivity in this blog post.",
    updatedAt: new Date(),
  },
];

export const ProjectCard: Story = {
  parameters: {},
  render: (args) => {
    return (
      <div className="relative grid max-w-sm grid-cols-1">
        {PROJECT_DATA.map((project) => (
          <Card>
            <div className="flex flex-col gap-4 p-4 text-gray-300">
              <div className="flex flex-row items-center justify-between">
                <h1 className="cursor-pointer text-text-md font-bold text-purple-300">
                  {project.title}
                </h1>
                <span className="text-xs text-gray-300">
                  {formatDistanceToNow(project.updatedAt)}
                </span>
              </div>

              <span>{project.location}</span>
              <div className="flex flex-row items-center gap-2">
                <span>Seeking: </span>
                <div className="flex flex-row items-center gap-2">
                  {project.positions.map((position) => (
                    <Badge>{position.title}</Badge>
                  ))}
                </div>
              </div>
              <AccordionPrimitive.Root type="single" collapsible>
                <AccordionPrimitive.Item
                  key={project.title}
                  value={project.title}
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row">
                      <Badge className="self-stretch" variant="success">
                        {project.status}
                      </Badge>
                    </div>

                    <AccordionTrigger />
                  </div>
                  <AccordionContent className="py-2">
                    {project.shortDescription}
                  </AccordionContent>
                </AccordionPrimitive.Item>
              </AccordionPrimitive.Root>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};
export const BlogCard: Story = {
  parameters: {},
  render: (args) => {
    return (
      <div className="relative grid max-w-sm grid-cols-1">
        {BLOG_DATA.map((blog) => (
          <Card>
            <div className="flex flex-col text-gray-300">
              <div className="relative h-32 w-full cursor-pointer">
                <Image alt={blog.title + "header"} src={blog.imageUrl} fill />
              </div>
              <div className="flex flex-col gap-4 p-4">
                <span>{blog.category}</span>
                <h1 className="cursor-pointer text-display-xs font-bold text-purple-300">
                  {blog.title}
                </h1>
                <p>{blog.shortDescription}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};
