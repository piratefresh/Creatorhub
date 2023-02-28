import { getRootLayout } from "@components/layouts/rootLayout";
import { api } from "@utils/api";
import Image from "next/image";
import {
  AccordionContent,
  AccordionPrimitive,
  AccordionTrigger,
  Badge,
  Card,
} from "ui";
import { formatDistanceToNow } from "date-fns";

const FindProjectPage = () => {
  const projects = api.project.getProjects.useQuery();

  if (!projects.data) return <div>Loading...</div>;
  console.log(projects);
  return (
    <div className="relative grid h-full grid-cols-3 gap-4">
      {projects.data.map((project) => (
        <Card>
          <div className="flex w-[400px] flex-col gap-4 p-4 text-gray-300">
            <div className="flex flex-row items-center justify-between gap-1">
              <h1 className="cursor-pointer break-words text-display-xs font-bold text-purple-300">
                {project.title}
              </h1>
              <span className="whitespace-nowrap text-xs text-gray-300">
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
                      {project.inProduction}
                    </Badge>
                  </div>

                  <AccordionTrigger />
                </div>
                <AccordionContent className="py-2">
                  {project.description}
                </AccordionContent>
              </AccordionPrimitive.Item>
            </AccordionPrimitive.Root>
          </div>
        </Card>
      ))}
    </div>
  );
};

FindProjectPage.getLayout = getRootLayout;

export default FindProjectPage;
