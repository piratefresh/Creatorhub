import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const OrganizationModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  email: z.string(),
  name: z.string().nullish(),
})

export interface CompleteOrganization extends z.infer<typeof OrganizationModel> {
  members: CompleteUser[]
}

/**
 * RelatedOrganizationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationModel: z.ZodSchema<CompleteOrganization> = z.lazy(() => OrganizationModel.extend({
  members: RelatedUserModel.array(),
}))
