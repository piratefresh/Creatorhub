import { getRootLayout } from "@components/layouts/rootLayout";
import { api } from "@utils/api";
import Link from "next/link";
import {
  AccordionContent,
  AccordionPrimitive,
  AccordionTrigger,
  Badge,
  Card,
  Input,
  Label,
} from "ui";
import { formatDistanceToNow } from "date-fns";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const FindProjectPage = () => {
  const projects = api.project.getProjects.useQuery();

  if (!projects.data) return <div>Loading...</div>;
  console.log(projects);
  return (
    <div className="flex flex-col gap-4">
      <div className="pinkPurpleGradientText text-display-md font-bold">
        Find a project
      </div>
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          name="search"
          addonBefore={
            <div className="rounded-y-lg flex items-center rounded-l-lg border border-r-0 py-1 pl-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </div>
          }
        />
      </div>
      <div
        className="relative grid grid-flow-dense grid-cols-1 items-start gap-4 md:grid-cols-3"
        style={{ gridAutoRows: "max-content" }}
      >
        {projects.data.map((project) => (
          <Card key={project.id}>
            <div className="flex max-w-[400px] flex-col gap-4 p-4 text-gray-300">
              <div className="flex flex-row items-start justify-between gap-1">
                <Link href={`project/${[project.id]}`}>
                  <h1 className="cursor-pointer break-words text-display-xs font-bold text-purple-300">
                    {project.title}
                  </h1>
                </Link>
                <span className="whitespace-nowrap text-xs text-gray-300">
                  {formatDistanceToNow(project.updatedAt)}
                </span>
                <span>Posted by {project.author?.name}</span>
              </div>

              <span>{project.location}</span>
              <div className="flex flex-row items-center gap-2">
                <span>Seeking: </span>
                <div className="flex flex-row items-center gap-2">
                  {project.positions.map((position) => (
                    <Link href={`project/${[project.id]}`}>
                      <Badge>{position.title}</Badge>
                    </Link>
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
                      <Badge
                        className="self-stretch"
                        variant={project.inProduction ? "success" : "warning"}
                      >
                        {project.inProduction
                          ? "In Production"
                          : "Pre Production"}
                      </Badge>
                    </div>

                    <AccordionTrigger />
                  </div>
                  <AccordionContent className="overflow-hidden whitespace-pre-wrap break-words py-2">
                    {project.description}
                  </AccordionContent>
                </AccordionPrimitive.Item>
              </AccordionPrimitive.Root>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

FindProjectPage.getLayout = getRootLayout;

export default FindProjectPage;
