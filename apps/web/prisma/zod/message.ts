import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteConversation, RelatedConversationModel } from "./index"

export const MessageModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  text: z.string(),
  senderId: z.string(),
  conversationId: z.string(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  sender: CompleteUser
  conversation: CompleteConversation
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  sender: RelatedUserModel,
  conversation: RelatedConversationModel,
}))
