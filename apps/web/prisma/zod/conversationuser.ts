import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteConversation, RelatedConversationModel } from "./index"

export const ConversationUserModel = z.object({
  userId: z.string(),
  conversationId: z.string(),
  createdAt: z.date(),
})

export interface CompleteConversationUser extends z.infer<typeof ConversationUserModel> {
  user: CompleteUser
  conversation: CompleteConversation
}

/**
 * RelatedConversationUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedConversationUserModel: z.ZodSchema<CompleteConversationUser> = z.lazy(() => ConversationUserModel.extend({
  user: RelatedUserModel,
  conversation: RelatedConversationModel,
}))
