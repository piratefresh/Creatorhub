import * as z from "zod"
import { CompleteSkill, RelatedSkillModel, CompleteApplications, RelatedApplicationsModel, CompleteProject, RelatedProjectModel } from "./index"

export const PositionModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  projectId: z.string().nullish(),
})

export interface CompletePosition extends z.infer<typeof PositionModel> {
  skills: CompleteSkill[]
  Applications: CompleteApplications[]
  Project?: CompleteProject | null
}

/**
 * RelatedPositionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPositionModel: z.ZodSchema<CompletePosition> = z.lazy(() => PositionModel.extend({
  skills: RelatedSkillModel.array(),
  Applications: RelatedApplicationsModel.array(),
  Project: RelatedProjectModel.nullish(),
}))
