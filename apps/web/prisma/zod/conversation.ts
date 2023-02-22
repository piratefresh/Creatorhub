import * as z from "zod"
import { CompleteMessage, RelatedMessageModel, CompleteConversationUser, RelatedConversationUserModel } from "./index"

export const ConversationModel = z.object({
  id: z.string(),
  lastMessageId: z.string().nullish(),
  createdAt: z.date(),
})

export interface CompleteConversation extends z.infer<typeof ConversationModel> {
  messages: CompleteMessage[]
  conversationUsers: CompleteConversationUser[]
}

/**
 * RelatedConversationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedConversationModel: z.ZodSchema<CompleteConversation> = z.lazy(() => ConversationModel.extend({
  messages: RelatedMessageModel.array(),
  conversationUsers: RelatedConversationUserModel.array(),
}))
