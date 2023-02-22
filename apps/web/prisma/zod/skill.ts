import * as z from "zod"
import { CompletePosition, RelatedPositionModel } from "./index"

export const SkillModel = z.object({
  id: z.string(),
  name: z.string(),
  positionId: z.string().nullish(),
})

export interface CompleteSkill extends z.infer<typeof SkillModel> {
  Position?: CompletePosition | null
}

/**
 * RelatedSkillModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSkillModel: z.ZodSchema<CompleteSkill> = z.lazy(() => SkillModel.extend({
  Position: RelatedPositionModel.nullish(),
}))
