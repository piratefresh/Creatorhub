import { TeamMemberTable } from "@components/client/TeamMemberTable";
import { getRootLayout } from "@components/layouts/rootLayout";
import { api } from "@utils/api";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Button,
} from "ui";
import { makeData } from "ui/components/Table";

const ProjectPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const { data } = api.project.getProject.useQuery({
    id: id as string,
  });

  const isCreator = data?.authorId === session?.user.id;

  if (!data) return <div>...Loading</div>;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="pinkPurpleGradientText text-display-md font-bold">
        {data.title}
      </h2>

      <div className="flex flex-row items-center gap-2">
        {data.positions.map((position) => (
          <Badge>{position.title}</Badge>
        ))}
      </div>
      {data.author ? (
        <div className="flex flex-row items-center gap-4">
          <Avatar src={data.author.image} size="md" rounded />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-100">
              {data.author.name}
            </h3>
            <span className="whitespace-nowrap text-xs text-gray-300">
              {formatDistanceToNow(data.updatedAt)}
            </span>
          </div>
        </div>
      ) : null}

      {isCreator ? (
        <div className="inline-flex">
          <Button size="lg" variant="primary">
            Request to join
          </Button>
        </div>
      ) : null}

      <p className="text-md text-gray-300">{data.description}</p>

      <h4 className="text-display-md font-medium text-gray-100">
        Available Roles
      </h4>

      {data.positions.map((pos) => (
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

      <TeamMemberTable data={data.memberships} title="Team Members" />
    </div>
  );
};

ProjectPage.getLayout = getRootLayout;

export default ProjectPage;
