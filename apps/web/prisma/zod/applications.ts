import * as z from "zod"
import { ApplicationStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteProject, RelatedProjectModel, CompletePosition, RelatedPositionModel } from "./index"

export const ApplicationsModel = z.object({
  id: z.string(),
  messageText: z.string(),
  status: z.nativeEnum(ApplicationStatus),
  userId: z.string(),
  projectId: z.string(),
  positionId: z.string(),
})

export interface CompleteApplications extends z.infer<typeof ApplicationsModel> {
  user: CompleteUser
  project: CompleteProject
  position: CompletePosition
}

/**
 * RelatedApplicationsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedApplicationsModel: z.ZodSchema<CompleteApplications> = z.lazy(() => ApplicationsModel.extend({
  user: RelatedUserModel,
  project: RelatedProjectModel,
  position: RelatedPositionModel,
}))
