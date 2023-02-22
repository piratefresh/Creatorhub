import { Position, Project, Skill } from "@prisma/client";

export type ProjectForm = Omit<
  Project,
  "authorId" | "category" | "updatedAt"
> & {
  positions: PositionWithSkill[];
};

export type TrimmedPosition = Omit<Position, "projectId" | "id">;
export type PositionWithSkill = TrimmedPosition & {
  skills: Omit<Skill[], "positionId">;
};
