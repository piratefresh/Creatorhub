import * as z from "zod";
import { LocationType } from "@prisma/client";
import {
  CompleteUser,
  RelatedUserModel,
  CompletePosition,
  RelatedPositionModel,
  CompleteMemberships,
  RelatedMembershipsModel,
  CompleteApplications,
  RelatedApplicationsModel,
} from "./index";

export const PositionModel = z.object({
  title: z.string(),
  description: z.string(),
});

export const ProjectModel = z.object({
  published: z.boolean(),
  title: z.string(),
  description: z.string(),
  tags: z.string().array(),
  image: z.string(),
  files: z.string().array().optional(),
  inProduction: z.boolean(),
  category: z.string().nullish(),
  positions: PositionModel.array(),
  locationType: z.nativeEnum(LocationType),
  location: z.string(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  lat: z.number().nullish(),
  lng: z.number().nullish(),
  timezone: z.string(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
  author?: CompleteUser | null;
  positions: CompletePosition[];
  memberships: CompleteMemberships[];
  Applications: CompleteApplications[];
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() =>
  ProjectModel.extend({
    author: RelatedUserModel.nullish(),
    positions: RelatedPositionModel.array(),
    memberships: RelatedMembershipsModel.array(),
    Applications: RelatedApplicationsModel.array(),
  })
);
