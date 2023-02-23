import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteProject, RelatedProjectModel, CompleteMemberships, RelatedMembershipsModel, CompleteOrganization, RelatedOrganizationModel, CompleteConversationUser, RelatedConversationUserModel, CompleteMessage, RelatedMessageModel, CompleteApplications, RelatedApplicationsModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  description: z.string().nullish(),
  skills: z.string().array(),
  rating: z.number().int().nullish(),
  role: z.nativeEnum(Role),
  organizationId: z.string().nullish(),
  personalWebsite: z.string().nullish(),
  instagram: z.string().nullish(),
  youtube: z.string().nullish(),
  vimeo: z.string().nullish(),
  github: z.string().nullish(),
  tiktok: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  projects: CompleteProject[]
  Memberships: CompleteMemberships[]
  Organization?: CompleteOrganization | null
  ConversationUser: CompleteConversationUser[]
  Message: CompleteMessage[]
  Applications: CompleteApplications[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  projects: RelatedProjectModel.array(),
  Memberships: RelatedMembershipsModel.array(),
  Organization: RelatedOrganizationModel.nullish(),
  ConversationUser: RelatedConversationUserModel.array(),
  Message: RelatedMessageModel.array(),
  Applications: RelatedApplicationsModel.array(),
}))
