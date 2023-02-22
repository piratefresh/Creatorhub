import * as z from "zod"
import { CompleteProject, RelatedProjectModel, CompleteUser, RelatedUserModel } from "./index"

export const MembershipsModel = z.object({
  projectId: z.string(),
  userId: z.string(),
  assignedAt: z.date(),
  assignedBy: z.string(),
})

export interface CompleteMemberships extends z.infer<typeof MembershipsModel> {
  project: CompleteProject
  user: CompleteUser
}

/**
 * RelatedMembershipsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMembershipsModel: z.ZodSchema<CompleteMemberships> = z.lazy(() => MembershipsModel.extend({
  project: RelatedProjectModel,
  user: RelatedUserModel,
}))
